import { cosmic } from "@/cosmic/client"
import { ProductCard, ProductType } from "./ProductCard"

export async function ProductGrid({ query }: { query: any }) {
  const { objects: products } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
  return (
    <>
      {products.map((product: ProductType) => {
        return <ProductCard key={product.id} product={product} />
      })}
    </>
  )
}
