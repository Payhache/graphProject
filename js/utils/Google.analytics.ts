import { getNonBlankValues } from "../nomogramme"

window.dataLayer = window.dataLayer || []
function gtag(..._: any[]) {
  window.dataLayer.push(arguments)
}
gtag("js", new Date())
gtag("config", "G-HEJ8Y5PWM2")

const btnCalcHalfLife = document.querySelector<HTMLButtonElement>(
  ".calc-half-life__submit"
)
const resultHalfLife = document.querySelector<HTMLParagraphElement>(
  '[data-text="result_calc_half_life"]'
)
const inputParacetamolFirstSample = document.querySelector<HTMLInputElement>(
  ".first-concentration__number"
)
const inputParacetamolSecondSample = document.querySelector<HTMLInputElement>(
  ".second-concentration__number"
)
const datePickerFirstSample =
  document.querySelector<HTMLInputElement>(".first-date__time")
const datePickerSecondSample =
  document.querySelector<HTMLInputElement>(".second-date__time")

if (
  !btnCalcHalfLife ||
  !resultHalfLife ||
  !inputParacetamolFirstSample ||
  !inputParacetamolSecondSample ||
  !datePickerFirstSample ||
  !datePickerSecondSample
) {
  throw new Error("Button not found")
}

btnCalcHalfLife.addEventListener("click", (event) => {
  if (resultHalfLife.classList.contains("error")) {
    return
  }

  const result =
    resultHalfLife.innerHTML?.match(/[-+]?[0-9]*\.?[0-9]+/g)?.join("") || null
  const firstSample = inputParacetamolFirstSample.value
  const secondSample = inputParacetamolSecondSample.value
  const firstDate = datePickerFirstSample.value
  const secondDate = datePickerSecondSample.value
  gtag(
    "event",
    (event.target as HTMLButtonElement)?.attributes.getNamedItem("data-text")
      ?.value,
    {
      event_category: "button",
      event_label: "calc-half-life",
      value: result,
      firstSample: firstSample,
      secondSample: secondSample,
      firstDate: firstDate,
      secondDate: secondDate,
    }
  )
})

const btnCalcToxicity =
  document.querySelector<HTMLButtonElement>(".nomogram__submit")
if (!btnCalcToxicity) {
  throw new Error("Button not found")
}

btnCalcToxicity.addEventListener("click", (event) => {
  const ingestionIntervals = document.querySelectorAll<HTMLInputElement>(
    ".nomogram__interval-after-ingestion"
  )
  const paracetamolConcentrationIntervals =
    document.querySelectorAll<HTMLInputElement>(
      ".nomogram__interval-paracetamol-concentration"
    )
  const ingestionTimes = getNonBlankValues(ingestionIntervals)
  const paracetamolConcentrations = getNonBlankValues(
    paracetamolConcentrationIntervals
  )
  const result = document
    .querySelector<HTMLParagraphElement>(".nomogram-result__text")
    ?.attributes.getNamedItem("data-result")?.value
  gtag(
    "event",
    (event.target as HTMLButtonElement)?.attributes.getNamedItem("data-text")
      ?.value,
    {
      event_category: "button",
      event_label: "calc-toxicity",
      value: result,
      ingestionTimes: ingestionTimes,
      paracetamolConcentrations: paracetamolConcentrations,
    }
  )
})
