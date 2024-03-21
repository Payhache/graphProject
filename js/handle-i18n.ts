import { changeLanguage } from "./utils/Trads"
import { Language, defaultLanguage } from "./available-languages"

window.currentLanguage = defaultLanguage
const btnTranslation =
  document.querySelectorAll<HTMLButtonElement>(".translation__btn")

changeLanguage()

btnTranslation.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.currentLanguage =
      (btn.dataset.language as Language | undefined) || defaultLanguage
    changeLanguage()
  })
})
