/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { Button } from "@/components/ui/button"
import { ImageGallery } from "@/components/ImageGallery"
import { ProductCard, ProductType } from "@/components/ProductCard"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import classNames from "classnames"
import { PreviewCopy } from "@/components/PreviewCopy"
import Link from "next/link"

export async function generateMetadata() {
  return {
    title: `Products`,
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "install"
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
    <div className="container m-auto grid items-center px-4 py-8">
      <PreviewCopy />
      <section className="container m-auto grid items-center px-4 py-8">
        <div className="relative mb-20 flex max-w-[950px] flex-col items-start">
          <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Shop Page
          </h1>
          <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="mb-8 md:mb-0">
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
    </div>
  )
}

function Code() {
  const productListCode = dedent`
    \`\`\`jsx
    // app/shop/page.tsx
    import { ProductList } from "@/cosmic/blocks/products/ProductList";
    export default async function Shop() {
      return (
        <ProductList
          query={{ type: "products" }}
        />
      );
    }
    \`\`\`
    `
  const singleProductCode = dedent`
    \`\`\`jsx
    // app/shop/[slug]/page.tsx
    import { SingleProduct } from "@/cosmic/blocks/products/SingleProduct";
    export default async function SingleProductPage({
      params,
    }: {
      params: { slug: string };
    }) {
      return (
        <SingleProduct query={{ slug: params.slug, type: "products" }} />
      );
    }
    \`\`\`
    `
  const blockCommand = dedent`
    \`\`\`bash
    bunx @cosmicjs/blocks add products image-gallery
    \`\`\`
    `
  const draftPreviewCode = dedent`
    \`\`\`jsx
    // app/shop/[slug]/page.tsx
    import { SingleProduct } from "@/cosmic/blocks/products/SingleProduct";
    export default async function SingleProductPage({
      params,
      searchParams,
    }: {
      params: { slug: string };
      searchParams?: {
        status: "draft" | "published" | "any";
      };
    }) {
      return (
        <SingleProduct
          query={{ slug: params.slug, type: "products" }}
          status={searchParams?.status}
        />
      );
    }
    \`\`\`
    `
  const localizationCode = dedent`
    \`\`\`jsx
    // app/[locale]/shop/page.tsx
    import { ProductList } from "@/cosmic/blocks/products/ProductList";
    export default async function Shop({
      params,
    }: {
      params: { locale: string };
    }) {
      return (
        <ProductList
          query={{ type: "products", locale: params.locale }}
        />
      );
    }
    \`\`\`
    `
  const paginationExampleCode = dedent`
    \`\`\`jsx
    // app/shop/page.tsx
    import { ProductList } from "@/cosmic/blocks/products/ProductList";
    import { Pagination } from "@/cosmic/blocks/pagination/Pagination";
    export default async function Shop({
      searchParams,
    }: {
      searchParams?: {
        page: number;
      };
    }) {
      const page = Number(searchParams?.page ? searchParams?.page : 1);
      const limit = 2;
      const skip = page * limit - limit;
      return (
        <>
          <ProductList
            query={{ type: "products" }}
            sort="-created_at"
            limit={limit}
            skip={skip}
            className="mb-10"
          />
          <Pagination
            query={{ type: "products" }}
            path="/shop"
            limit={limit}
            page={page}
          />
        </>
      );
    }
    \`\`\`
    `
  const loadMoreExampleCode = dedent`
    \`\`\`jsx
    // app/shop/page.tsx
    import { ProductList } from "@/cosmic/blocks/products/ProductList";
    import { LoadMore } from "@/cosmic/blocks/pagination/LoadMore";
    import { cosmic } from "@/cosmic/client";

    const LIMIT = 2;

    async function loadMoreProducts(offset: number = 0) {
      "use server";
      const nextOffset = LIMIT + offset;
      return [
        <ProductList
          key={offset}
          query={{ type: "products" }}
          sort="-order"
          limit={LIMIT}
          skip={nextOffset}
          className="mb-10"
          noWrap
        />,
        nextOffset,
      ] as const;
    }

    export default async function Shop() {
      const skip = 0;
      const { total } = await cosmic.objects
        .find({ type: "products" })
        .props("id")
        .limit(1);
      return (
        <LoadMore
          loadMoreAction={loadMoreProducts}
          initialOffset={skip}
          total={total}
          limit={LIMIT}
          className="max-w-[1000px] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10"
        >
          <ProductList
            query={{ type: "products" }}
            sort="-created_at"
            limit={LIMIT}
            skip={skip}
            noWrap
          />
        </LoadMore>
      );
    }
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
        "This will add the `ProductCard.tsx`,`ProductList.tsx`, and `SingleProduct.tsx` files to `cosmic/blocks/products`. This will also add the image-gallery block to be used in the single product page.",
    },
    {
      title: "Usage: Shop",
      code: productListCode,
      description:
        "Add a new file located at `app/shop/page.tsx` with the following:",
    },
    {
      title: "Usage: Single Product page",
      code: singleProductCode,
      description:
        "Add a new file located at `app/shop/[slug]/page.tsx` with the following:",
    },
    {
      title: "Pagination",
      description: (
        <>
          See the{" "}
          <Link href="/blocks/pagination" className="text-cosmic-blue">
            pagination Block
          </Link>{" "}
          for installation steps and view the full examples below.
        </>
      ),
    },
  ]
  const examples = [
    {
      title: "Draft preview",
      description:
        "Enable draft preview by setting the `status` property on the Block. View the draft preview content by setting the `?status=any` in the URL. Note: This is a basic example. It is advisable to consider a security strategy if you intend to keep your preview private.",
      code: draftPreviewCode,
    },
    {
      title: "Draft preview link in the dashboard",
      description:
        "To add the draft preview link in the dashboard, go to Products Object type > Settings and add your preview link in the dashboard under Additional Settings. For example adding the link `http://localhost:3000/shop/[object_slug]?status=any` will add a Preview button to each product.",
    },
    {
      title: "Pagination: Numbered pages",
      code: paginationExampleCode,
      description: "Add numbered pagination with the pagination Block.",
    },
    {
      title: "Pagination: Load more",
      code: loadMoreExampleCode,
      description:
        "Use the load more pagination Block to fetch additional products using a Server Action.",
    },
    {
      title: "Localization",
      code: localizationCode,
      description:
        "First, enable localization in the dashboard by going to Products Object type > Settings under Additional Settings. Then set the locale on your specific Object. Finally, pass the `locale` parameter into the query to fetch your localized content. Then go to any page with localization set, for example: `https://localhost:3000/es/shop` or `https://localhost:3000/en/shop`.",
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} featureKey="products" />
      <div className="mb-2 border-t pt-10">
        <h3 className="text-3xl font-semibold">Examples</h3>
      </div>
      <CodeSteps scratch steps={examples} featureKey="products" />
    </>
  )
}
