/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/cosmic/elements/Button"
import { ShoppingCartIcon, XIcon, Trash2Icon } from "lucide-react"
import { useState, useContext } from "react"
import { CartContext } from "@/cosmic/blocks/ecommerce/CartProvider"
import { ProductType } from "@/cosmic/blocks/ecommerce/AddToCart"
import Link from "next/link"
import { cn } from "@/cosmic/utils"
import { useSearchParams } from "next/navigation"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
)

function cartTotal(cart: ProductType[]) {
  let total = 0
  for (const item of cart) {
    total += item.metadata.price
  }
  return total
}

export function CheckOut({
  className,
  productPath,
}: {
  className?: string
  productPath: string
}) {
  const [submitting, setSubmitting] = useState(false)
  const { cart, setCart, cartOpen, setCartOpen } = useContext(CartContext)
  const [error, setError] = useState<boolean | undefined>()

  function removeItem(item: ProductType) {
    const newCart = cart.filter(
      (product: ProductType) => product.id !== item.id
    )
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  function removeCart() {
    setCart([])
    localStorage.removeItem("cart")
  }

  function CartItem({
    item,
    removeItem,
  }: {
    item: ProductType
    removeItem: any
  }) {
    return (
      <div className="my-4 flex gap-4">
        <div>
          <Link href={`${productPath}/${item.slug}`}>
            <img
              src={`${item.metadata.image.imgix_url}?w=300&auto=format,compression`}
              className="h-[100px] w-[100px] rounded-xl object-cover"
              alt={item.title}
            />
          </Link>
        </div>
        <div>
          <div className="mb-1 text-lg">
            <Link href={`${productPath}/${item.slug}`}>{item.title}</Link>
          </div>
          <div className="mb-2 text-lg">
            ${item.metadata.price.toLocaleString("en-US")}
            {item.metadata?.recurring?.is_recurring && (
              <span>
                {" "}
                /{" "}
                {item.metadata.recurring.interval_count
                  ? item.metadata.recurring.interval_count
                  : ""}{" "}
                {item.metadata.recurring.interval.value}
                {item.metadata.recurring.interval_count &&
                item.metadata.recurring.interval_count !== 1
                  ? "s"
                  : ""}
              </span>
            )}
          </div>
          <div className="flex cursor-pointer" onClick={() => removeItem(item)}>
            <Trash2Icon className="size-4 relative top-[2px] mr-2" />{" "}
            <span className="text-sm">Remove</span>
          </div>
        </div>
      </div>
    )
  }
  async function handleSubmit() {
    setSubmitting(true)
    const stripe_product_ids = cart.map((product: any) => {
      return product.metadata.stripe_product_id
    })
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        stripe_product_ids,
        redirect_url: window.location.href.split("?")[0],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    if (!res.ok) {
      setSubmitting(false)
      setError(data.raw.message)
    } else {
      if (data.url) window.location = data.url
    }
  }
  // Remove cart
  const searchParams = useSearchParams()
  const success = searchParams.get("success")
  if (success && cart.length) {
    removeCart()
  }
  return (
    <div className={cn("relative", className)}>
      {cart.length ? (
        <>
          <Button
            onClick={() => (cartOpen ? setCartOpen(false) : setCartOpen(true))}
          >
            <ShoppingCartIcon className="size-4 mr-2" />
            {cart.length} item{cart.length !== 1 ? "s" : ""}
          </Button>
          {cartOpen ? (
            <div className="absolute right-0 top-12 w-[330px] rounded-lg border border-gray-300 bg-white p-4 text-gray-700 dark:border-gray-500 dark:bg-black dark:text-gray-200">
              <div className="mb-2 text-xl font-semibold">Your Cart</div>
              <div className="max-h-[300px] overflow-scroll">
                {cart.map((item: ProductType) => {
                  return (
                    <CartItem
                      key={item.id}
                      item={item}
                      removeItem={removeItem}
                    />
                  )
                })}
              </div>
              <Button
                className="mt-3 w-full"
                disabled={submitting}
                type="submit"
                onClick={handleSubmit}
              >
                <ShoppingCartIcon className="size-4 mr-2" />
                {submitting ? (
                  <>Checking out...</>
                ) : (
                  <>
                    Checkout Total: ${cartTotal(cart).toLocaleString("en-US")}
                  </>
                )}
              </Button>
              <div
                onClick={() => setCartOpen(false)}
                className="mt-4 cursor-pointer text-center underline"
              >
                Continue shopping
              </div>
            </div>
          ) : (
            ""
          )}
          {error && (
            <div className="absolute right-2 top-12 w-[300px] rounded-lg border border-red-500 bg-white p-4 text-gray-600 dark:bg-black dark:text-gray-200">
              <XIcon
                className="size-4 absolute right-4 top-4 cursor-pointer"
                onClick={() => setError(false)}
              />
              There was an error from the API:
              <br />
              {error}
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  )
}
