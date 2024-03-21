import { ChartDatasetProperties, TitleOptions } from "chart.js"

declare module "chart.js" {
  interface ChartDatasetProperties {
    labelName?: string
  }

  interface TitleOptions {
    textName?: string
  }
}
