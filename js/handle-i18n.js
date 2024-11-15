import { changeLanguage } from "./utils/Trads.js";
import { defaultLanguage } from './available-languages.js'

window.currentLanguage = defaultLanguage;
const btnTranslation = document.querySelectorAll('.translation__btn');

changeLanguage(currentLanguage);

btnTranslation.forEach(btn => {
  btn.addEventListener('click', () => {
      window.currentLanguage = btn.dataset.language;
      changeLanguage(currentLanguage);
  })
})