// ProductList.tsx
import { cosmic } from "@/cosmic/client"
import { ProductCard, ProductType } from "./ProductCard"

function Products({ products }: { products: ProductType[] }) {
  return (
    <>
      {products.map((product: ProductType) => {
        return <ProductCard key={product.id} product={product} />
      })}
    </>
  )
}

export async function ProductList({
  query,
  sort,
  limit,
  skip,
  className,
  status,
  noWrap = false,
}: {
  query: any
  sort?: string
  limit?: number
  skip?: number
  className?: string
  status?: "draft" | "published" | "any"
  noWrap?: boolean
}) {
  const { objects: products } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .sort(sort ? sort : "created_at")
    .limit(limit ? limit : 100)
    .skip(skip ? skip : 0)
    .status(status ? status : "published")
  if (noWrap) return <Products products={products} />
  return (
    <div
      className={`m-auto grid max-w-[1200px] grid-cols-1 gap-4 px-4 md:grid-cols-3 lg:grid-cols-4 ${className}`}
    >
      <Products products={products} />
    </div>
  )
}
