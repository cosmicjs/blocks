import React from "react"

import { pluralize } from "@/lib/utils"

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
      {objectTypes} {objectTypes && `${pluralize("Object type", objectTypes)}`}{" "}
      {objects ? " • " + objects : ""}{" "}
      {objects ? `demo ${pluralize("Object", objects)}` : ""}
      {metafields} {metafields && `${pluralize("Metafield", metafields)}`}
      {!metafields && !objectTypes && !objects && "No content installed"}
    </p>
  )
}
export default BlockStats
