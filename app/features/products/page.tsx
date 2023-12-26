/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { Button } from "@/components/ui/button"
import { BucketAPILink } from "@/components/bucket-api-link"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { ImageGallery } from "@/components/image-gallery"
import { ProductCard, ProductType } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"
import CodeSteps from "@/components/layouts/CodeSteps"
import classNames from "classnames"

export async function generateMetadata() {
  return {
    title: `Products`,
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "code"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  return (
    <>
      <section
        className={classNames("container m-auto grid items-center pb-8", {
          "max-w-[800px]": tab !== "preview",
          "max-w-[1200px]": tab === "preview",
        })}
      >
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}

async function Preview() {
  const cosmic = cosmicSourceBucketConfig
  const { objects: products } = await cosmic.objects
    .find({
      type: "products",
    })
    .props("id,slug,title,metadata")
    .depth(1)

  const product = products[0]
  return (
    <>
      <section className="container m-auto grid items-center px-4 py-8">
        <div className="relative m-auto mb-20 flex max-w-[950px] flex-col items-start gap-2">
          <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Shop Page
          </h1>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product: ProductType) => {
              return <ProductCard key={product.id} product={product} />
            })}
          </div>
        </div>
        <div className="relative m-auto max-w-[950px]">
          <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Single Product Page
          </h1>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol role="list" className="flex space-x-2">
              <li>
                <div className="flex items-center">
                  <span className="mr-2 text-sm font-medium text-gray-900 dark:text-white">
                    Shop
                  </span>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm font-medium text-gray-500 hover:text-gray-600">
                {product.title}
              </li>
            </ol>
          </nav>
          <div className="grid md:grid-cols-2 md:gap-x-8">
            <div>
              <ImageGallery items={product.metadata.gallery} />
            </div>
            <div>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                {product.title}
              </h1>
              <p className="mb-6 text-3xl tracking-tight text-gray-900 dark:text-white">
                ${product.metadata.price.toLocaleString("en-US")}
              </p>
              <div className="mb-8">
                <Button type="submit">Add to cart</Button>
              </div>
              <h2 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Details
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.metadata.description,
                }}
                className="mb-6 text-sm text-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Code() {
  const codeString = dedent`
    \`\`\`jsx
      // app/shop/page.tsx
      import { ProductGrid } from "@/cosmic/blocks/products/ProductGrid";

      export default async function ShopPage() {
        return (
          <>
            <section className="container pb-8 m-auto">
              <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                  Shop
                </h1>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  <ProductGrid query={{ type: "products" }} />
                </div>
              </div>
            </section>
          </>
        );
      }
    \`\`\`
    `

  const codeSingleProductString = dedent`
    \`\`\`jsx
      // app/shop/[slug]/page.tsx
      import { SingleProduct } from "@/cosmic/blocks/products/SingleProduct";
      
      export default async function SingleProductPage({
        params,
      }: {
        params: { slug: string };
      }) {
        return <SingleProduct query={{ slug: params.slug, type: "products", locale: "" }} />
      }
    \`\`\`
    `
  const blockCommand = dedent`
    \`\`\`bash
    bunx @cosmicjs/blocks add products image-gallery
    \`\`\`
    `
  const steps = [
    {
      title: "Install the Block content model",
      description: "This will add the `products` Object type to your Bucket.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the `ProductCard.tsx`,`ProductGrid.tsx`, and `SingleProduct.tsx` files to `cosmic/blocks/products`. This will also add the image-gallery block to be used in the single product page.",
    },
    {
      title: "Add a new file located at `app/shop/page.tsx` with the following",
      code: codeString,
    },
    {
      title:
        "Add a new file located at `app/shop/[slug]/page.tsx` with the following",
      code: codeSingleProductString,
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} preview={<Preview />} featureKey="products" />
    </>
  )
}
