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

export function InstallDialog({
  featureKey,
  setShowModal,
}: {
  featureKey?: string
  setShowModal: any
}) {
  const [showLoginMessage, setShowLoginMessage] = useState(false)
  let bucket_slug = ""
  let read_key = ""
  let write_key = ""

  if (typeof window !== "undefined" && localStorage.getItem("bucket_slug")) {
    bucket_slug = localStorage.getItem("bucket_slug") || ""
    read_key = localStorage.getItem("read_key") || ""
    write_key = localStorage.getItem("write_key") || ""
    if (showLoginMessage) setShowLoginMessage(false)
  } else {
    // TODO: add messaging to send user to extension in dashboard
    // alert("NO BUCKET INFO. Installing features will not work.")
    if (!showLoginMessage) setShowLoginMessage(true)
  }

  const [installationSuccess, setInstallationSuccess] = useState(false)

  const cosmicTargetBucket = cosmicTargetBucketConfig(
    bucket_slug,
    read_key,
    write_key
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
      metafields = await getPageBuilderMetafields()
      await addPagesObjectType(cosmicTargetBucket, metafields)
      // Add page
      const page = await getPage(cosmicSourceBucketConfig)
      await addPage(cosmicTargetBucket, page)
    }
    if (featureKey === "blog") {
      await addAuthorObjectType(cosmicTargetBucket)
      const authors = await getAuthors(cosmicSourceBucketConfig)
      const categories = await getCategories(cosmicSourceBucketConfig)
      metafields = await getCategoriesMetafields()
      await addCategoriesObjectType(cosmicTargetBucket, metafields)
      await addAuthors(cosmicTargetBucket, authors)
      await addCategories(cosmicTargetBucket, categories)
      // Update authors and categories
      const newAuthors = await getAuthors(cosmicTargetBucket)
      const newCategories = await getCategories(cosmicTargetBucket)
      metafields = await getBlogMetafields()
      await addBlogObjectType(cosmicTargetBucket, metafields)
      // Add blog
      let blogs = await getBlogs(cosmicSourceBucketConfig)
      await addBlogs(cosmicTargetBucket, blogs, newAuthors, newCategories)
    }
    if (featureKey === "navigation_menus") {
      metafields = await getNavMenuMetafields()
      await addNavMenusObjectType(cosmicTargetBucket, metafields)
      // Add navigation menus
      const settings = await getNavMenus(cosmicSourceBucketConfig)
      await addNavMenus(cosmicTargetBucket, settings)
    }
    if (featureKey === "global_settings") {
      metafields = await getGlobalSettingsMetafields()
      await addGlobalSettingsObjectType(cosmicTargetBucket, metafields)
      // Add settings
      const settings = await getGlobalSettings(cosmicSourceBucketConfig)
      await addGlobalSettings(cosmicTargetBucket, settings)
    }
    if (featureKey === "testimonials") {
      metafields = await getTestimonialsMetafields()
      await addTestimonialsObjectType(cosmicTargetBucket, metafields)
      // Add testimonials
      const testimonials = await getTestimonials(cosmicSourceBucketConfig)
      await addTestimonials(cosmicTargetBucket, testimonials)
    }
    if (featureKey === "events") {
      metafields = await getEventsMetafields()
      await addEventsObjectType(cosmicTargetBucket, metafields)
      // Add events
      const events = await getEvents(cosmicSourceBucketConfig)
      await addEvents(cosmicTargetBucket, events)
    }
    if (featureKey === "comments") {
      metafields = await getCommentsMetafields()
      await addCommentsObjectType(cosmicTargetBucket, metafields)
      // Add comments
      const comments = await getComments(cosmicSourceBucketConfig)
      await addComments(cosmicTargetBucket, comments)
    }
    if (featureKey === "team") {
      metafields = await getTeamMetafields()
      await addTeamObjectType(cosmicTargetBucket, metafields)
      // Add team
      const teamMembers = await getTeamMembers(cosmicSourceBucketConfig)
      await addTeamMembers(cosmicTargetBucket, teamMembers)
    }
    if (featureKey === "products") {
      metafields = await getProductsMetafields()
      await addProductsObjectType(cosmicTargetBucket, metafields)
      // Add products
      const products = await getProducts(cosmicSourceBucketConfig)
      await addProducts(cosmicTargetBucket, products)
    }
    setInstallationSuccess(true)
  }

  async function installFeature(selectedObjectTypes: string[]) {
    try {
      if (feature?.type === "metafields")
        await installMetafields(selectedObjectTypes)
      else await installObjectType()
    } catch (err) {}
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

  if (showLoginMessage) {
    return (
      <Dialog open onOpenChange={() => closeModal()}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => closeModal()}
          onEscapeKeyDown={() => closeModal()}
        >
          <DialogHeader>
            <DialogTitle>Log in required</DialogTitle>
            <DialogDescription>
              <div className="mb-4">
                Log in to the Cosmic dashboard to install this Block.
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link
              href="https://app.cosmicjs.com/login"
              target="_parent"
              className={cn(buttonVariants())}
            >
              Log in
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

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
                  ? `An object type with slug ${feature?.slug} already exists. Please rename or delete the existing Object Type if you'd like to install ${feature?.title} Block.`
                  : "You can continue with the steps to install code for the Block or view the installed Object Type for your Block."}
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {!conflict && tab !== "code" && (
              <Link
                href={`${feature?.preview_link}?tab=code`}
                className={cn(buttonVariants({ variant: "secondary" }))}
                onClick={() => closeModal()}
              >
                View Code
              </Link>
            )}
            {!conflict && tab === "code" && (
              <Button
                className={cn(buttonVariants({ variant: "secondary" }))}
                onClick={() => closeModal()}
              >
                Continue
              </Button>
            )}
            {bucket_slug && (
              <a
                href={`${DASHBOARD_URL}/${bucket_slug}/objects?query={"type":"${objectTypeSlug}"}`}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants())}
              >
                View Object Type
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            )}
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
                    {objectTypes?.length ? (
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
                      href={`https://app.cosmicjs.com/${bucket_slug}/object-types/new`}
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
                } catch (err) {}
                setInstalling(false)
                setInstallationSuccess(true)
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
