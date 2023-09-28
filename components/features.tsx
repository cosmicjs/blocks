"use client"

import { useState } from "react"

import {
  addAuthorObjectType,
  addBlogObjectType,
  addCategoriesObjectType,
  addPagesObjectType,
  cosmicBucketConfig,
  getBlogMetafields,
  getFAQMetafields,
  getPageBuilderMetafields,
  getSEOMetafields,
} from "@/lib/cosmic"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Types
type FeaturesProps = {
  bucket: {
    bucket_slug: string
    read_key: string
    write_key: string
  }
}

type FeatureType = "metafields" | "object_type"

// Set the target Object type. This will change to selectable.
const OBJECT_TYPE = "test-target"

function featureInfo(featureKey: string) {
  let title
  let type
  switch (featureKey) {
    case "seo":
      title = "SEO"
      type = "metafields"
      break
    case "faqs":
      title = "FAQs"
      type = "metafields"
      break
    case "page_builder":
      title = "Page Builder"
      type = "object_type"
      break
    case "blog":
      title = "Blog"
      type = "object_type"
      break
  }
  return {
    title,
    type,
  }
}

export function Features({ bucket }: FeaturesProps) {
  const cosmic = cosmicBucketConfig(
    bucket.bucket_slug,
    bucket.read_key,
    bucket.write_key
  )

  const [showModal, setShowModal] = useState<boolean>(false)
  const [featureKey, setFeatureKey] = useState<string>("")
  const [installedFeatures, setInstalledFeature] = useState<string[]>([])

  function InstallDialog() {
    const [installing, setInstalling] = useState<boolean>(false)
    return (
      <Dialog open onOpenChange={() => setShowModal(false)}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setShowModal(false)}
          onEscapeKeyDown={() => setShowModal(false)}
        >
          <DialogHeader>
            <DialogTitle>Add {featureInfo(featureKey).title}</DialogTitle>
            <DialogDescription>
              Which existing Object type would you like to add this feature to?
              You can also{" "}
              <a
                href={`https://app.cosmicjs.com/${bucket.bucket_slug}/object-types/new`}
                target="_parent"
                className="text-cosmic-blue"
              >
                create a new Object type
              </a>
              .
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              onClick={async () => {
                setInstalling(true)
                try {
                  await installFeature()
                  setInstalledFeature([...installedFeatures, featureKey])
                } catch (err) {}
                setInstalling(false)
                setShowModal(false)
              }}
            >
              {installing
                ? `Installing...`
                : `Install ${featureInfo(featureKey).title}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  async function installMetafields() {
    // Get the selected Object type metafields
    const {
      object_type: { metafields },
    } = await cosmic.objectTypes.findOne(OBJECT_TYPE)

    // Get new Metafields
    let newMetafields
    if (featureKey === "seo") newMetafields = await getSEOMetafields(cosmic)
    if (featureKey === "faqs") newMetafields = await getFAQMetafields(cosmic)

    const keyArr = newMetafields.map((obj: any) => obj.key)

    // Check for the metafields existing
    let metafieldClash
    for (const metafield of metafields) {
      if (keyArr.indexOf(metafield.key) !== -1) {
        console.log("FOUND!!!!")
        throw Error
      }
    }
    // Check for metafield key exists then add to the top of the Metafields array
    if (!metafieldClash) {
      await cosmic.objectTypes.updateOne(OBJECT_TYPE, {
        metafields: [...newMetafields, ...metafields],
      })
    }
  }

  async function installObjectType() {
    let metafields
    if (featureKey === "page_builder") {
      metafields = await getPageBuilderMetafields(cosmic)
      const seoMetafields = await getSEOMetafields(cosmic)
      await addPagesObjectType(cosmic, [...metafields, ...seoMetafields])
    }
    if (featureKey === "blog") {
      await addAuthorObjectType(cosmic)
      await addCategoriesObjectType(cosmic)
      metafields = await getBlogMetafields(cosmic)
      const seoMetafields = await getSEOMetafields(cosmic)
      await addBlogObjectType(cosmic, [...metafields, ...seoMetafields])
    }
  }

  async function installFeature() {
    try {
      if (featureInfo(featureKey).type === "metafields")
        await installMetafields()
      else await installObjectType()
    } catch (err) {}
  }

  function handleInstallClick(key: string) {
    setShowModal(true)
    setFeatureKey(key)
  }

  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold">Install New Object Type</h2>
      <div className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Blog</h2>
        <div className="mb-4">
          <p className="text-lg text-gray-800 dark:text-dark-gray-800">
            Add a blog to your Bucket. Requires the following Object type slugs
            to be available: `blog-posts`,`authors`, and `categories`. Blog
            fields include:
          </p>
        </div>
        <div className="mb-6">
          <ol className="list-decimal pl-8">
            <li>Hero image</li>
            <li>Content in Markdown</li>
            <li>Author Object relationship Metafield</li>
            <li>Categories Object relationship Metafield</li>
            <li>SEO fields (see below)</li>
          </ol>
        </div>
        {installedFeatures.indexOf("blog") !== -1 ? (
          <Button variant="secondary" disabled>
            Installed ✅
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => handleInstallClick("blog")}
          >
            Install Blog Feature
          </Button>
        )}
      </div>
      <div className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Page Builder</h2>
        <div className="mb-4">
          <p className="text-lg text-gray-800 dark:text-dark-gray-800">
            Add a `pages` Object type to your Bucket with a page builder. Fields
            include:
          </p>
        </div>
        <div className="mb-6">
          <ol className="list-decimal pl-8">
            <li>Hero image</li>
            <li>Rich text content</li>
            <li>
              Repeating layouts in: 1 column and alternating 2 columns with
              headline, image, and rich text content.
            </li>
            <li>SEO fields (see below)</li>
          </ol>
        </div>
        {installedFeatures.indexOf("page_builder") !== -1 ? (
          <Button variant="secondary" disabled>
            Installed ✅
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => handleInstallClick("page_builder")}
          >
            Install Page Builder
          </Button>
        )}
      </div>
      <h2 className="mb-4 text-3xl font-semibold">
        Install Feature to Existing Object Type
      </h2>
      <div className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">SEO fields</h2>
        <div className="mb-4">
          <p className="text-lg text-gray-800 dark:text-dark-gray-800">
            Adds SEO fields. Fields include:
          </p>
        </div>
        <div className="mb-6">
          <p>
            Parent Metafield with key <code>seo</code> with the following
            children:
          </p>
          <ol className="list-decimal pl-8">
            <li>SEO Title</li>
            <li>SEO Description</li>
            <li>OG title</li>
            <li>OG description</li>
            <li>OG image</li>
          </ol>
        </div>
        {installedFeatures.indexOf("seo") !== -1 ? (
          <Button variant="secondary" disabled>
            Installed ✅
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => handleInstallClick("seo")}>
            Install SEO
          </Button>
        )}
      </div>
      <div className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">FAQs</h2>
        <div className="mb-4">
          <p className="text-lg text-gray-800 dark:text-dark-gray-800">
            Add FAQs to any Object type. Fields include:
          </p>
        </div>
        <div className="mb-6">
          <p>
            Repeater Metafield with key <code>faqs</code> with the following
            children:
          </p>
          <ol className="list-decimal pl-8">
            <li>Question</li>
            <li>Answer</li>
          </ol>
        </div>
        {installedFeatures.indexOf("faqs") !== -1 ? (
          <Button variant="secondary" disabled>
            Installed ✅
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => handleInstallClick("faqs")}
          >
            Install FAQs
          </Button>
        )}
      </div>
      {showModal && <InstallDialog />}
    </div>
  )
}
