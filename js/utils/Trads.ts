import { Chart } from "chart.js"
import { Language, languages } from "../available-languages"

const getTranslation = (textID: string | undefined) => {
  if (!textID) {
    return "Missing translation"
  }
  if (!Object.keys(languages[window.currentLanguage]).includes(textID)) {
    console.warn(`The textID ${textID} is not a valid key in the model`)
    return textID
  }

  return languages[window.currentLanguage][
    textID as keyof (typeof languages)[Language]
  ]
}

export function changeLanguage() {
  let regexForResultText = /result/
  document.querySelectorAll<HTMLElement>(".i18n").forEach((element) => {
    let textID = element.dataset.text

    if (regexForResultText.test(element.className)) {
      element.innerText = ""
    } else if (
      element instanceof HTMLInputElement &&
      element.placeholder != null &&
      element.dataset.text != null
    ) {
      element.placeholder = getTranslation(textID)
    } else if (element.dataset.text != null) {
      element.innerText = getTranslation(textID)
    }
  })
}

export function changeGraphLanguage(graph: Chart) {
  graph.data.datasets.forEach((dataset) => {
    const labelName = dataset.labelName
    if (labelName !== null && labelName !== undefined) {
      dataset.label = getTranslation(labelName)
    }
  })

  if (graph.options.plugins && graph.options.plugins.title) {
    graph.options.plugins.title.text = getTranslation(
      graph.options.plugins.title.textName
    )
  }
  graph.update()
}
