import { pluralize } from "@/lib/utils"
import React from "react"

type BlockStatsProps = {
  objectTypes?: number
  objects?: number
  metafields?: number
}

const BlockStats: React.FC<BlockStatsProps> = ({
  objectTypes,
  objects,
  metafields,
}) => {
  return (
    <p className="text-gray-600 dark:text-dark-gray-600">
      {objectTypes}{" "}
      {objectTypes && `${pluralize("Object type", objectTypes)} •`} {objects}{" "}
      {objects && `${pluralize("Object", objects)}`}
      {metafields} {metafields && `${pluralize("Metafield", metafields)}`}
    </p>
  )
}
export default BlockStats
