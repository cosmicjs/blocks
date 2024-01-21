import { packageManagers } from "@/config/site"
export type PackageManagers = (typeof packageManagers)[number]["value"]
