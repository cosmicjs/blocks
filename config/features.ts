export function featureInfo(featureKey: string) {
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
