/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { Button } from "@/components/ui/button"
import { BucketAPILink } from "@/components/bucket-api-link"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { ImageGallery } from "@/components/image-gallery"
import { ProductCard, ProductType } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"

export async function generateMetadata() {
  return {
    title: `Products`,
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "tab"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  const cosmic = cosmicSourceBucketConfig
  const { objects: products } = await cosmic.objects
    .find({
      type: "products",
    })
    .props("id,slug,title,metadata")
    .depth(1)

  function Preview() {
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
      import { cosmic } from "@/lib/cosmic";
      import { ProductCard, ProductType } from "@/components/product-card";

      export default async function ShopPage() {
        const { objects: products } = await cosmic.objects
          .find({
            type: "products",
          })
          .props("id,slug,title,metadata")
          .depth(1);
        return (
          <>
            <section className="container pb-8 m-auto">
              <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                  Shop
                </h1>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {products.map((product: ProductType) => {
                    return <ProductCard key={product.id} product={product} />;
                  })}
                </div>
              </div>
            </section>
          </>
        );
      }
      \`\`\`
      `
    const codeProductCardString = dedent`
    \`\`\`jsx
    // components/product-card.tsx
    import Link from "next/link";

    export type ProductType = {
      id: string;
      title: string;
      slug: string;
      metadata: {
        image: {
          imgix_url: string;
        };
        description: string;
        price: number;
      };
    };

    export function ProductCard({ product }: { product: ProductType }) {
      return (
        <Link href={\`/shop/\${product.slug}\`} className="group relative w-56">
          <div className="w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 h-52">
            <img
              src={\`\${product.metadata.image.imgix_url}?w=1200&auto=format,compression\`}
              alt={product.title}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {product.title}
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-900">
              \${product.metadata.price.toLocaleString("en-US")}
            </p>
          </div>
        </Link>
      );
    }
    \`\`\`
    `
    const codeImageGalleryString = dedent`
    \`\`\`jsx
    // components/image-gallery.tsx
    "use client";

    import { useState } from "react";
    import { cn } from "@/lib/utils";

    export type GalleryItemType = {
      image: {
        imgix_url: string;
      };
      description: string;
    };

    export function ImageGallery({ items }: { items: GalleryItemType[] }) {
      const [mainItem, setMainItem] = useState(items[0]);

      return (
        <>
          <div>
            <img
              src={\`\${mainItem.image.imgix_url}?w=1200&auto=format,compression\`}
              alt={mainItem.description}
              className="rounded-xl mb-4 h-80 w-full object-cover object-center"
            />
          </div>
          <div className="flex gap-x-2">
            {items.map((item: any) => {
              return (
                <div
                  onClick={() => setMainItem(item)}
                  key={item.image.imgix_url}
                  className={cn(
                    \`rounded-xl overflow-hidden border-2\`,
                    item.image.imgix_url === mainItem.image.imgix_url
                      ? "border-gray-600"
                      : ""
                  )}
                >
                  <img
                    src={\`\${item.image.imgix_url}?w=200&auto=format,compression\`}
                    className="h-20 w-20 object-cover object-center cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </>
      );
    }
    \`\`\`
    `

    const codeSingleProductString = dedent`
      \`\`\`jsx
      // app/shop/[slug]/page.tsx
      import { cosmic } from "@/lib/cosmic";
      import Link from "next/link";
      import { Button } from "@/components/ui/button";
      import { ImageGallery } from "@/components/image-gallery";
      export default async function SingleProductPage({
        params,
      }: {
        params: { slug: string };
      }) {
        const { object: product } = await cosmic.objects
          .findOne({
            type: "products",
            slug: params.slug,
          })
          .props("id,slug,title,metadata")
          .depth(1);
        return (
          <section className="container pb-8 m-auto">
            <div className="relative m-auto max-w-[950px]">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol role="list" className="flex space-x-2">
                  <li>
                    <div className="flex items-center">
                      <Link
                        href="/shop"
                        className="mr-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Shop
                      </Link>
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
                  <p className="text-3xl tracking-tight text-gray-900 dark:text-white mb-6">
                    \${product.metadata.price.toLocaleString("en-US")}
                  </p>
                  <div className="mb-8">
                    <Button type="submit">Add to cart</Button>
                  </div>
                  <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Details</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: product.metadata.description }}
                    className="mb-6 text-sm text-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </section>
        );
      }
      \`\`\`
      `
    return (
      <div className="pt-8">
        <div className="mb-6">
          The following code example uses Next.js, Tailwind CSS, and the Cosmic
          JavaScript SDK. Feel free to skip any steps that have already been
          completed.
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 1. Install a new Next.js project
          </h3>
          <div className="py-2">
            Note: Be sure to include TypeScript and Tailwind CSS in the
            installation options.
          </div>
          <Markdown>
            {dedent(`\`\`\`bash
            bunx create-next-app@latest cosmic-app
            \`\`\`
          `)}
          </Markdown>
          <Markdown>
            {dedent(`\`\`\`bash
            cd cosmic-app
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 2. Add the Cosmic JavaScript SDK the React Markdown packages.
          </h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun add @cosmicjs/sdk
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 3. Create a new file located at `lib/cosmic.ts` with the
            following
          </h3>
          <div className="py-2">
            Note: You will need to swap `BUCKET_SLUG` and `BUCKET_READ_KEY` with
            your Bucket API keys found in <BucketAPILink />.
          </div>
          <Markdown>
            {dedent(`\`\`\`ts
            // lib/cosmic.ts
            import { createBucketClient } from "@cosmicjs/sdk";
            export const cosmic = createBucketClient({
              bucketSlug: "BUCKET_SLUG",
              readKey: "BUCKET_READ_KEY",
            });
            \`\`\`
            `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 4. Add a new file located at `components/product-card.tsx` with
            the following
          </h3>
          <Markdown>{codeProductCardString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 5. Add a new file located at `app/shop/page.tsx` with the
            following
          </h3>
          <Markdown>{codeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 6. Add a new file located at `components/image-gallery.tsx`
            with the following
          </h3>
          <Markdown>{codeImageGalleryString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 6. Add a new file located at `app/shop/[slug]/page.tsx` with
            the following
          </h3>
          <Markdown>{codeSingleProductString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">Step 4. Run your app</h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun dev
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Step 7. Go to http://localhost:3000/shop to see your shop. It should
            look like this:
          </h3>
        </div>
        <div className="mb-6">
          <Preview />
        </div>
      </div>
    )
  }
  return (
    <>
      <SiteHeader />
      <section className="container m-auto grid max-w-[800px] items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}
