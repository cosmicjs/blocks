import React from "react"
import { ThemedImage } from "../elements/ThemedImage/ThemedImage"

const Footer: React.FC = () => {
  return (
    <div className="mx-auto my-20 h-[40px]">
      <ThemedImage
        lightSrc={`/assets/footer-light.png`}
        darkSrc={`/assets/footer-dark.png`}
        alt="footer logo"
        className="w-32 pb-7"
      />
    </div>
  )
}
export default Footer
