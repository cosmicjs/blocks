/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"
import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import classNames from "classnames"
import { PreviewCopy } from "@/components/PreviewCopy"
import { ProductList } from "@/components/ProductList"
import { LoadMore } from "@/components/LoadMore"

export async function generateMetadata() {
  return {
    title: `Pagination`,
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

const LIMIT = 2

async function loadMoreProducts(offset: number = 0) {
  "use server"
  const nextOffset = LIMIT + offset
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
  ] as const
}

async function Preview() {
  const skip = 0
  const { total } = await cosmicSourceBucketConfig.objects
    .find({ type: "products" })
    .props("id")
    .limit(1)
  return (
    <div className="container m-auto grid items-center px-4 py-8">
      <PreviewCopy />
      <section className="container m-auto grid items-center px-4 py-8">
        <div className="relative mb-20 flex w-full max-w-[950px] flex-col items-start">
          <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Load more pagination
          </h1>
          <LoadMore
            loadMoreAction={loadMoreProducts}
            initialOffset={skip}
            total={total}
            limit={LIMIT}
            className="m-auto grid w-full grid-cols-1 gap-6 md:w-[600px] md:grid-cols-2"
          >
            <ProductList
              query={{ type: "products" }}
              sort="-created_at"
              limit={LIMIT}
              skip={skip}
              className="mb-10"
              noWrap
            />
          </LoadMore>
        </div>
      </section>
    </div>
  )
}

function Code() {
  const paginationCommand = dedent`
    \`\`\`bash
    bunx @cosmicjs/blocks add pagination
    \`\`\`
    `

  const paginationUsageCode = dedent`
    \`\`\`jsx
    <Pagination query={{ type: "products" }} path="/shop" limit={2} page={1} />
    \`\`\`
    `

  const loadMoreUsageCode = dedent`
    \`\`\`jsx
    <LoadMore
      loadMoreAction={loadMoreServerAction}
      initialOffset={skip}
      total={total}
      limit={limit}
    >
      {/* initial list code */ }
    </LoadMore>
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
            className="mb-10"
            noWrap
          />
        </LoadMore>
      );
    }
    \`\`\`
    `
  const steps = [
    {
      title: "Install the Block code",
      code: paginationCommand,
      description:
        "This will add `LoadMore.tsx` and `Pagination.tsx` files to your blocks folder located in `cosmic/blocks/pagination`.",
    },
    {
      title: "Usage: Load More Pagination",
      code: loadMoreUsageCode,
      description:
        "Add the LoadMore component to create an infinite scroll around your list. See full code example in the examples section below.",
    },
    {
      title: "Usage: Numbered Pagination",
      code: paginationUsageCode,
      description:
        "Add the pagination Block to your code with the following. See how to use this with `ProductList.tsx` in the pagination example below.",
    },
  ]
  const examples = [
    {
      title: "Load more pagination",
      code: loadMoreExampleCode,
      description:
        "Use the load more pagination Block to fetch additional products using a Server Action.",
    },
    {
      title: "Numbered pagination",
      code: paginationExampleCode,
      description: "Add numbered pagination with the pagination Block.",
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
