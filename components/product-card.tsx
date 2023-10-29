// components/product-card.tsx
import Link from "next/link"

export type ProductType = {
  id: string
  title: string
  slug: string
  metadata: {
    image: {
      imgix_url: string
    }
    description: string
    price: number
  }
}

export function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="group relative w-56 cursor-pointer">
      <div className="w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 h-60">
        <img
          src={`${product.metadata.image.imgix_url}?w=1200&auto=format,compression`}
          alt={product.title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 dark:text-white">
            <span aria-hidden="true" className="absolute inset-0"></span>
            {product.title}
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          ${product.metadata.price.toLocaleString("en-US")}
        </p>
      </div>
    </div>
  )
}
