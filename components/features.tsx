"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { featureInfo, features } from "@/config/features"
import {
  addAuthorObjectType,
  addAuthors,
  addBlog,
  addBlogObjectType,
  addCategories,
  addCategoriesObjectType,
  addGlobalSettings,
  addGlobalSettingsObjectType,
  addNavMenus,
  addNavMenusObjectType,
  addPage,
  addPagesObjectType,
  addProducts,
  addProductsObjectType,
  cosmicSourceBucketConfig,
  cosmicTargetBucketConfig,
  getAuthors,
  getBlog,
  getBlogMetafields,
  getCategories,
  getCategoriesMetafields,
  getFAQMetafields,
  getGlobalSettings,
  getGlobalSettingsMetafields,
  getNavMenuMetafields,
  getNavMenus,
  getPage,
  getPageBuilderMetafields,
  getProducts,
  getProductsMetafields,
  getSEOMetafields,
} from "@/lib/cosmic"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { FeatureCard } from "@/components/feature-card"

// Types
type FeaturesProps = {
  targetBucket: {
    bucket_slug: string
    read_key: string
    write_key: string
  }
  objectTypes: any
}

export function Features({ targetBucket, objectTypes }: FeaturesProps) {
  const cosmicTargetBucket = cosmicTargetBucketConfig(
    targetBucket.bucket_slug,
    targetBucket.read_key,
    targetBucket.write_key
  )

  const [showModal, setShowModal] = useState<boolean>(false)
  const [featureKey, setFeatureKey] = useState<string>("")
  const [installedFeatures, setInstalledFeature] = useState<string[]>([])
  function InstallDialog() {
    const [installing, setInstalling] = useState<boolean>(false)
    const [selectedObjectTypes, setSelectedObjectTypes] = useState<string[]>([])
    const { toast } = useToast()
    function handleObjectTypeSelected(typeSlug: string) {
      if (selectedObjectTypes.indexOf(typeSlug) === -1)
        setSelectedObjectTypes([...selectedObjectTypes, typeSlug])
      else {
        const removedTypeArr = selectedObjectTypes.filter((e) => e !== typeSlug)
        setSelectedObjectTypes(removedTypeArr)
      }
    }
    return (
      <Dialog open onOpenChange={() => setShowModal(false)}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setShowModal(false)}
          onEscapeKeyDown={() => setShowModal(false)}
        >
          <DialogHeader>
            <DialogTitle>Install {featureInfo(featureKey).title}</DialogTitle>
            <DialogDescription>
              {featureInfo(featureKey).type === "metafields" ? (
                <>
                  <div className="mb-4">
                    {objectTypes.length ? (
                      <>
                        Which existing Object type would you like to add this
                        feature to? Or
                      </>
                    ) : (
                      <>
                        You do not have any existing Object types to add this
                        feature. You will need to{" "}
                      </>
                    )}{" "}
                    <a
                      href={`https://app.cosmicjs.com/${targetBucket.bucket_slug}/object-types/new`}
                      target="_parent"
                      className="text-cosmic-blue"
                    >
                      create a new Object type
                    </a>
                    .
                  </div>
                  <div className="mb-4">
                    {objectTypes?.map((type: any) => {
                      return (
                        <div className="flex h-8" key={type.slug}>
                          <Checkbox
                            id={type.slug}
                            className="mr-2"
                            onCheckedChange={() => {
                              handleObjectTypeSelected(type.slug)
                            }}
                            checked={selectedObjectTypes.includes(type.slug)}
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
                  </div>
                </>
              ) : (
                <>Are you sure you want to add this feature to your Project?</>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {featureInfo(featureKey).type === "metafields" &&
            !objectTypes.length ? (
              <></>
            ) : (
              <Button
                type="submit"
                disabled={installing}
                onClick={async () => {
                  setInstalling(true)
                  try {
                    await installFeature(selectedObjectTypes)
                    setInstalledFeature([...installedFeatures, featureKey])
                  } catch (err) {}
                  setInstalling(false)
                  setShowModal(false)
                  toast({
                    title: "Success!",
                    description: `${featureInfo(featureKey).title} installed`,
                  })
                }}
              >
                {installing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Installing...
                  </>
                ) : (
                  `Install ${featureInfo(featureKey).title}`
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  async function installMetafields(selectedObjectTypes: string[]) {
    if (!selectedObjectTypes.length) return alert("No Object types selected")
    for (const typeSlug of selectedObjectTypes) {
      // Get the selected Object type metafields
      const {
        object_type: { metafields },
      } = await cosmicTargetBucket.objectTypes.findOne(typeSlug)

      // Get new Metafields
      let newMetafields
      if (featureKey === "seo") newMetafields = await getSEOMetafields()
      if (featureKey === "faqs") newMetafields = await getFAQMetafields()

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
  }

  async function installObjectType() {
    let metafields
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
      let blog = await getBlog(cosmicSourceBucketConfig)
      blog.metadata.author = newAuthors[0].id
      blog.metadata.categories = [newCategories[0].id, newCategories[1].id]
      await addBlog(cosmicTargetBucket, blog)
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
    if (featureKey === "products") {
      metafields = await getProductsMetafields()
      await addProductsObjectType(cosmicTargetBucket, metafields)
      // Add products
      const products = await getProducts(cosmicSourceBucketConfig)
      await addProducts(cosmicTargetBucket, products)
    }
  }

  async function installFeature(selectedObjectTypes: string[]) {
    try {
      if (featureInfo(featureKey).type === "metafields")
        await installMetafields(selectedObjectTypes)
      else await installObjectType()
    } catch (err) {}
  }

  function handleInstallClick(key: string) {
    setShowModal(true)
    setFeatureKey(key)
  }

  return (
    <div>
      {features.map((feature) => {
        return (
          <div key={feature.key}>
            <FeatureCard
              feature={feature}
              handleInstallClick={handleInstallClick}
              installedFeatures={installedFeatures}
            />
          </div>
        )
      })}
      {showModal && <InstallDialog />}
      <Toaster />
    </div>
  )
}
