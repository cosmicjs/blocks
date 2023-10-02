import { Button } from "@/components/ui/button"

type Feature = {
  key: string
  title: string
  description: string
  field_list: string[]
}

export function FeatureCard({
  feature,
  handleInstallClick,
  installedFeatures,
}: {
  feature: Feature
  handleInstallClick: any
  installedFeatures: any
}) {
  return (
    <div className="mb-10 rounded-xl border p-6">
      <h2 className="mb-4 text-2xl font-semibold">{feature.title}</h2>
      <div className="mb-4">
        <p className="text-lg text-gray-800 dark:text-dark-gray-800">
          {feature.description}
        </p>
      </div>
      <div className="mb-6">
        <ol className="list-decimal pl-8">
          {feature.field_list.map((item: string) => {
            return <li key={item}>{item}</li>
          })}
        </ol>
      </div>
      {installedFeatures.indexOf(feature.key) !== -1 ? (
        <Button variant="secondary" disabled>
          Installed ✅
        </Button>
      ) : (
        <Button
          variant="secondary"
          onClick={() => handleInstallClick(feature.key)}
        >
          Install Blog Feature
        </Button>
      )}
    </div>
  )
}
