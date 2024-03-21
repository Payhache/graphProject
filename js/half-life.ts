import * as Dom from "./utils/Dom"
import * as Calculs from "./utils/Calculs"
import { languages } from "./available-languages"

const OPTIMAL_ELIMINATION_TIME = 4 // time in hour

const pResult = document.querySelector<HTMLParagraphElement>(
  ".calc-half-life__result"
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

const btnCalcHalfLife = document.querySelector<HTMLButtonElement>(
  ".calc-half-life__submit"
)

if (
  !pResult ||
  !inputParacetamolFirstSample ||
  !inputParacetamolSecondSample ||
  !datePickerFirstSample ||
  !datePickerSecondSample ||
  !btnCalcHalfLife
) {
  throw new Error("One or more elements are missing")
}

btnCalcHalfLife.addEventListener("click", () => {
  const duration = Calculs.calcTimeBetweenTwoDatesInHour(
    datePickerSecondSample.value,
    datePickerFirstSample.value
  )
  const halfLife = Calculs.calcHalfLife(
    +inputParacetamolFirstSample.value,
    +inputParacetamolSecondSample.value,
    duration
  )
  const isValidData = checkData(duration, halfLife)

  if (!isValidData) {
    const classNameResult = Dom.getSuccessOrErrorClass(!isValidData)
    Dom.toggleClassNames(pResult, classNameResult)
    displayErrorResult(pResult)
    Dom.showHtmlElement(pResult)
    return
  }

  const isToxic = checkToxicity(halfLife)
  const classNameResult = Dom.getSuccessOrErrorClass(isToxic)

  Dom.toggleClassNames(pResult, classNameResult)
  displayHalfLifeResult(pResult, halfLife)
  Dom.showHtmlElement(pResult)
})

function displayHalfLifeResult(htmlElement: HTMLElement, halfLife: string) {
  htmlElement.textContent = languages[
    window.currentLanguage
  ].result_calc_half_life.replace("resultToReplace", halfLife)
}

function displayErrorResult(htmlElement: HTMLElement) {
  htmlElement.textContent = languages[window.currentLanguage].badCalcul
}

function checkData(duration: number, halfLife: string) {
  return duration > 0 && +halfLife > 0
}

function checkToxicity(halfLife: string) {
  return +halfLife > OPTIMAL_ELIMINATION_TIME
}
