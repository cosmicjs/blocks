import { pluralize } from "@/lib/utils"
import React from "react"

type FeatureStatsProps = {
  objectTypes?: number
  objects?: number
  metafields?: number
}

const FeatureStats: React.FC<FeatureStatsProps> = ({
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
export default FeatureStats
