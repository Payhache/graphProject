import * as Calculs from "./utils/Calculs"
import {
  toggleClassNames,
  showHtmlElement,
  getSuccessOrErrorClass,
} from "./utils/Dom"
import { languages } from "./available-languages"

const DOSE_VALUE_MAX = 150

const inputHypotheticDose = document.querySelector<HTMLInputElement>(
  ".calc-dose__hypothetic_dosis"
)
const inputSubjectWeight =
  document.querySelector<HTMLInputElement>(".calc-dose__weight")

const btnCalcDose = document.querySelector<HTMLButtonElement>(".calc-dose__btn")
const pResultDose =
  document.querySelector<HTMLParagraphElement>(".calc-dose__result")

if (
  !inputHypotheticDose ||
  !inputSubjectWeight ||
  !btnCalcDose ||
  !pResultDose
) {
  throw new Error("One or more elements are missing")
}

const inputs = [inputHypotheticDose, inputSubjectWeight]

inputs.forEach((input) =>
  input.addEventListener("input", () => {
    const disabled = inputs.some(({ value }) => value === "")
    btnCalcDose.disabled = disabled
  })
)

btnCalcDose.disabled = true
btnCalcDose.addEventListener("click", () => {
  const result = calcParacetamolDose()
  const isToxicDose = checkDoseToxicity(result)
  const classNameResult = getSuccessOrErrorClass(isToxicDose)

  toggleClassNames(pResultDose, classNameResult)
  showHtmlElement(pResultDose)
  displayDoseResult(result)
})

function calcParacetamolDose() {
  const dose = parseFloat(
    (inputHypotheticDose && inputHypotheticDose.value) || "0"
  )
  const weight = parseFloat(
    (inputSubjectWeight && inputSubjectWeight.value) || "0"
  )

  return Calculs.calcDoseParacetamol(weight, dose)
}

function displayDoseResult(result: string) {
  if (!pResultDose) return
  pResultDose.textContent = languages[
    window.currentLanguage
  ].calc_dose_result.replace("resultToReplace", result)
}

function checkDoseToxicity(result: number | string) {
  return +result > DOSE_VALUE_MAX
}
