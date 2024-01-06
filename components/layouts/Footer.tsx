import React from "react"
import { ThemedImage } from "../elements/ThemedImage/ThemedImage"
import Link from "next/link"
const Footer: React.FC = () => {
  return (
    <div className="mx-auto my-20 h-[40px]">
      <Link href="https://www.cosmicjs.com?utm_source=blocks" target="_parent">
        <ThemedImage
          lightSrc={`/assets/footer-light.png`}
          darkSrc={`/assets/footer-dark.png`}
          alt="footer logo"
          className="w-32 pb-7"
        />
      </Link>
    </div>
  )
}
export default Footer
