"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AlertCircle, CheckCircle2, ExternalLink, Loader2 } from "lucide-react"

import { blocksData } from "@/config/blocks.data"
import {
  addAuthorObjectType,
  addAuthors,
  addBlogObjectType,
  addBlogs,
  addCategories,
  addCategoriesObjectType,
  addComments,
  addCommentsObjectType,
  addGlobalSettings,
  addGlobalSettingsObjectType,
  addNavMenus,
  addNavMenusObjectType,
  addPage,
  addPagesObjectType,
  addProducts,
  addProductsObjectType,
  addTeamMembers,
  addTeamObjectType,
  addTestimonials,
  addTestimonialsObjectType,
  cosmicSourceBucketConfig,
  cosmicTargetBucketConfig,
  getAuthors,
  getBlogMetafields,
  getBlogs,
  getCategories,
  getCategoriesMetafields,
  getComments,
  getCommentsMetafields,
  getFAQMetafields,
  getGlobalSettings,
  getGlobalSettingsMetafields,
  getNavMenuMetafields,
  getNavMenus,
  getObjectTypes,
  getPage,
  getPageBuilderMetafields,
  getProducts,
  getProductsMetafields,
  getSEOMetafields,
  getImageGalleryMetafields,
  getTeamMembers,
  getTeamMetafields,
  getTestimonials,
  getTestimonialsMetafields,
  getEventsMetafields,
  getEvents,
  addEventsObjectType,
  addEvents,
} from "@/lib/cosmic"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DASHBOARD_URL } from "@/constants"
import { Highlight } from "./layouts/CodeSteps"
import { useSearchParams } from "next/navigation"
import APIKeysDialog from "./APIKeysDialog"

export function InstallDialog({
  featureKey,
  setShowModal,
}: {
  featureKey?: string
  setShowModal: any
}) {
  const [showKeysModal, setShowKeysModal] = useState(false)
  const [bucketSlug, setBucketSlug] = useState("")
  const [readKey, setReadKey] = useState("")
  const [writeKey, setWriteKey] = useState("")

  useEffect(() => {
    const initializeKeys = () => {
      if (localStorage.getItem("bucket_slug")) {
        setBucketSlug(localStorage.getItem("bucket_slug") || "")
        setReadKey(localStorage.getItem("read_key") || "")
        setWriteKey(localStorage.getItem("write_key") || "")
        if (showKeysModal) setShowKeysModal(false)
      } else {
        // TODO: add messaging to send the user to the extension in the dashboard
        // alert("NO BUCKET INFO. Installing features will not work.")
        if (!showKeysModal) setShowKeysModal(true)
      }
    }

    initializeKeys()
  }, [])

  const [installationSuccess, setInstallationSuccess] = useState(false)
  const [installationFailed, setInstallationFailed] = useState(false)

  const cosmicTargetBucket = cosmicTargetBucketConfig(
    bucketSlug,
    readKey,
    writeKey
  )
  const feature = blocksData.filter((block) => block?.key === featureKey)[0]
  const [installing, setInstalling] = useState<boolean>(false)
  const [objectTypes, setObjectTypes] = useState<string[]>([])
  const [selectedObjectTypes, setSelectedObjectTypes] = useState<string[]>([])
  const [conflict, setConflict] = useState(false)
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")

  function handleObjectTypeSelected(typeSlug: string) {
    if (selectedObjectTypes.indexOf(typeSlug) === -1)
      setSelectedObjectTypes([...selectedObjectTypes, typeSlug])
    else {
      const removedTypeArr = selectedObjectTypes.filter((e) => e !== typeSlug)
      setSelectedObjectTypes(removedTypeArr)
    }
  }

  async function installMetafields(selectedObjectTypes: string[]) {
    if (!selectedObjectTypes?.length) return alert("No Object types selected")
    for (const typeSlug of selectedObjectTypes) {
      // Get the selected Object type metafields
      const {
        object_type: { metafields },
      } = await cosmicTargetBucket.objectTypes.findOne(typeSlug)

      // Get new Metafields
      let newMetafields
      if (featureKey === "seo") newMetafields = await getSEOMetafields()
      if (featureKey === "faqs") newMetafields = await getFAQMetafields()
      if (featureKey === "image-gallery")
        newMetafields = await getImageGalleryMetafields()

      const keyArr = newMetafields.map((obj: any) => obj.key)

      // Check for the metafields existing
      let metafieldClash
      for (const metafield of metafields) {
        if (keyArr.indexOf(metafield.key) !== -1) {
          throw Error
        }
      }
      // Check for metafield key exists then add to the top of the Metafields array
      if (!metafieldClash) {
        await cosmicTargetBucket.objectTypes.updateOne(typeSlug, {
          metafields: [...newMetafields, ...metafields],
        })
      }
    }
    setInstallationSuccess(true)
  }

  async function installObjectType() {
    const existingObjectTypes = await getObjectTypes(cosmicTargetBucket)
    let metafields
    // Check for Object type slug exists
    if (
      existingObjectTypes?.filter(
        (objectType: any) => objectType.slug === feature?.slug
      )[0]
    )
      return setConflict(true)

    if (featureKey === "pages") {
      let page
      await Promise.all([
        getPageBuilderMetafields().then((result) => (metafields = result)),
        getPage(cosmicSourceBucketConfig).then((result) => (page = result)),
      ])
      await addPagesObjectType(cosmicTargetBucket, metafields)
      await addPage(cosmicTargetBucket, page)
    }

    if (featureKey === "blog") {
      let authors, categories, newAuthors, newCategories, blogs

      await Promise.all([
        addAuthorObjectType(cosmicTargetBucket),
        getAuthors(cosmicSourceBucketConfig).then(
          (result) => (authors = result)
        ),
        getCategories(cosmicSourceBucketConfig).then(
          (result) => (categories = result)
        ),
        getCategoriesMetafields().then((result) => (metafields = result)),
      ])

      await Promise.all([
        addCategoriesObjectType(cosmicTargetBucket, metafields),
        addAuthors(cosmicTargetBucket, authors),
        addCategories(cosmicTargetBucket, categories),
      ])

      // Update authors and categories
      await Promise.all([
        getAuthors(cosmicTargetBucket).then((result) => (newAuthors = result)),
        getCategories(cosmicTargetBucket).then(
          (result) => (newCategories = result)
        ),
        getBlogMetafields().then((result) => (metafields = result)),
        getBlogs(cosmicSourceBucketConfig).then((result) => (blogs = result)),
      ])

      await addBlogObjectType(cosmicTargetBucket, metafields)

      // Add blog
      await addBlogs(cosmicTargetBucket, blogs, newAuthors, newCategories)
    }

    if (featureKey === "nav-menus" || featureKey === "layout") {
      let menus
      await Promise.all([
        getNavMenuMetafields().then((result) => (metafields = result)),
        getNavMenus(cosmicSourceBucketConfig).then(
          (result) => (menus = result)
        ),
      ])
      await addNavMenusObjectType(cosmicTargetBucket, metafields)
      // Add navigation menus
      await addNavMenus(cosmicTargetBucket, menus)
    }

    if (featureKey === "layout") {
      let settings
      await Promise.all([
        getGlobalSettingsMetafields().then((result) => (metafields = result)),
        getGlobalSettings(cosmicSourceBucketConfig).then(
          (result) => (settings = result)
        ),
      ])
      await addGlobalSettingsObjectType(cosmicTargetBucket, metafields)
      // Add settings
      await addGlobalSettings(cosmicTargetBucket, settings)
    }

    if (featureKey === "testimonials") {
      let testimonials
      await Promise.all([
        getTestimonialsMetafields().then((result) => (metafields = result)),
        getTestimonials(cosmicSourceBucketConfig).then(
          (result) => (testimonials = result)
        ),
      ])
      await addTestimonialsObjectType(cosmicTargetBucket, metafields)
      // Add testimonials
      await addTestimonials(cosmicTargetBucket, testimonials)
    }

    if (featureKey === "events") {
      let events
      await Promise.all([
        getEventsMetafields().then((result) => (metafields = result)),
        getEvents(cosmicSourceBucketConfig).then((result) => (events = result)),
      ])
      metafields = await addEventsObjectType(cosmicTargetBucket, metafields)
      // Add events
      await addEvents(cosmicTargetBucket, events)
    }

    if (featureKey === "comments") {
      let comments
      await Promise.all([
        getCommentsMetafields().then((result) => (metafields = result)),
        getComments(cosmicSourceBucketConfig).then(
          (result) => (comments = result)
        ),
      ])
      await addCommentsObjectType(cosmicTargetBucket, metafields)
      // Add comments
      await addComments(cosmicTargetBucket, comments)
    }

    if (featureKey === "team") {
      let teamMembers
      await Promise.all([
        getTeamMetafields().then((result) => (metafields = result)),
        getTeamMembers(cosmicSourceBucketConfig).then(
          (result) => (teamMembers = result)
        ),
      ])
      await addTeamObjectType(cosmicTargetBucket, metafields)
      // Add team
      await addTeamMembers(cosmicTargetBucket, teamMembers)
    }

    if (featureKey === "products") {
      let products
      await Promise.all([
        getProductsMetafields().then((result) => (metafields = result)),
        getProducts(cosmicSourceBucketConfig).then(
          (result) => (products = result)
        ),
      ])
      await addProductsObjectType(cosmicTargetBucket, metafields)
      // Add products
      await addProducts(cosmicTargetBucket, products)
    }

    setInstallationSuccess(true)
  }

  async function installFeature(selectedObjectTypes: string[]) {
    try {
      if (feature?.type === "metafields")
        await installMetafields(selectedObjectTypes)
      else await installObjectType()
    } catch (err) {
      throw err
    }
  }

  // Fetch Object Types
  useEffect(() => {
    if (feature?.type !== "metafields") return
    if (!objectTypes?.length) {
      setLoading(true)
      const fetchObjectTypes = async () => {
        const newObjectTypes = await getObjectTypes(cosmicTargetBucket)
        setObjectTypes(newObjectTypes)
        setLoading(false)
      }
      fetchObjectTypes()
    }
  }, [feature, objectTypes, cosmicTargetBucket])

  const closeModal = () => {
    setShowModal(false)
    setConflict(false)
  }

  if (showKeysModal)
    return (
      <APIKeysDialog
        onClose={() => {
          setShowKeysModal(false)
          closeModal()
        }}
        onSave={() => {
          setShowKeysModal(false)
          setInstallationFailed(false)
          setInstalling(false)
        }}
      />
    )

  if (installationSuccess || conflict) {
    const objectTypeSlug =
      feature?.type === "object_type" ? feature?.slug : selectedObjectTypes?.[0]

    return (
      <Dialog open onOpenChange={() => closeModal()}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => closeModal()}
          onEscapeKeyDown={() => closeModal()}
        >
          <DialogHeader>
            {conflict ? (
              <DialogTitle className="flex items-center">
                {" "}
                <AlertCircle className="mr-2 text-orange-500" />
                {feature?.title} already exists!
              </DialogTitle>
            ) : (
              <DialogTitle className="flex items-center">
                {" "}
                <CheckCircle2 className="mr-2 text-green-500" />
                {feature?.title} installed successfully!
              </DialogTitle>
            )}
            <DialogDescription>
              <div className="mb-4">
                {conflict
                  ? `An Object type with slug ${feature?.slug} already exists. Please rename or delete the existing Object type if you'd like to install ${feature?.title} Block.`
                  : "Continue to install the Block code or go to the dashboard to view and update the Block content."}
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {!conflict && tab !== "install" && (
              <Link
                href={`${feature?.preview_link}?tab=install`}
                className={cn(buttonVariants({ variant: "secondary" }))}
                onClick={() => closeModal()}
              >
                Install
              </Link>
            )}
            {bucketSlug && (
              <a
                href={`${DASHBOARD_URL}/${bucketSlug}/objects?query={"type":"${objectTypeSlug}"}`}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                View Block content
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            )}
            {!conflict && tab === "install" && (
              <Button
                className={cn(buttonVariants())}
                onClick={() => closeModal()}
              >
                Continue
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  if (installationFailed) {
    return (
      <Dialog open onOpenChange={() => closeModal()}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => closeModal()}
          onEscapeKeyDown={() => closeModal()}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {" "}
              <AlertCircle className="mr-2 text-red-500" />
              Installation failed!
            </DialogTitle>
            <DialogDescription>
              <div className="mb-4">
                Looks like the installation for {feature.title} failed. Please
                make sure your API keys are correct and try again.
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className={cn(buttonVariants({ variant: "secondary" }))}
              onClick={() => closeModal()}
            >
              Cancel
            </Button>
            <Button onClick={() => setShowKeysModal(true)}>
              Check API Keys
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open onOpenChange={() => closeModal()}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => closeModal()}
        onEscapeKeyDown={() => closeModal()}
      >
        <DialogHeader>
          <DialogTitle>Install {feature?.title}</DialogTitle>
          <DialogDescription>
            <div className="mb-4">
              {feature?.type === "metafields" ? (
                <>
                  <div className="mb-4">
                    {!loading && objectTypes?.length ? (
                      <>
                        Which existing Object type would you like to add this
                        feature to? Or
                      </>
                    ) : (
                      <>
                        You do not have any existing Object types to add this
                        feature?. You will need to{" "}
                      </>
                    )}{" "}
                    <a
                      href={`https://app.cosmicjs.com/${bucketSlug}/object-types/new`}
                      target="_parent"
                      className="text-cosmic-blue"
                    >
                      create a new Object type
                    </a>
                    .
                  </div>
                  <div className="mb-4">
                    {loading && (
                      <div className="space-y-2">
                        {new Array(4).fill(0).map((arr) => (
                          <div className="flex animate-pulse space-x-1">
                            <div className="rounded-md bg-gray-100 p-2 dark:bg-dark-gray-50"></div>
                            <div className="rounded-lg bg-gray-100 px-20 dark:bg-dark-gray-50"></div>
                          </div>
                        ))}
                      </div>
                    )}
                    {objectTypes?.length ? (
                      <>
                        {objectTypes?.map((type: any) => {
                          return (
                            <div className="flex h-8" key={type.slug}>
                              <Checkbox
                                id={type.slug}
                                className="mr-2"
                                onCheckedChange={() => {
                                  handleObjectTypeSelected(type.slug)
                                }}
                                checked={selectedObjectTypes.includes(
                                  type.slug
                                )}
                              />
                              <label
                                className="relative top-[-2px] cursor-pointer"
                                htmlFor={type.slug}
                              >
                                {type.title}
                              </label>
                            </div>
                          )
                        })}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              ) : (
                <>Are you sure you want to add this feature to your Project?</>
              )}
            </div>
            <div>
              <Highlight text={feature?.confirmation} />
            </div>{" "}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {feature?.type === "metafields" && !objectTypes?.length ? (
            <></>
          ) : (
            <Button
              type="submit"
              disabled={installing}
              onClick={async () => {
                setInstalling(true)
                try {
                  await installFeature(selectedObjectTypes)
                } catch (error) {
                  setInstallationFailed(true)
                  throw error
                }
                setInstalling(false)
              }}
            >
              {installing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Installing...
                </>
              ) : (
                `Install ${feature?.title}`
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
