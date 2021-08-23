import * as Calculs from './utils/Calculs.js';
import * as Dom from '../js/utils/Dom.js';
import { languages } from './available-languages.js'

const DOSE_VALUE_MAX = 150;

const inputHypotheticDose = document.querySelector('.subject_hypothetic_dosis');
const inputSubjectWeight = document.querySelector('.subject_weight');

const btnCalcDose = document.querySelector('.calc_dose_paracetamol');
const pResultDose = document.querySelector('.result_calc_dose_paracetamol');

btnCalcDose.addEventListener("click", () => {
    const result = calcParacetamolDose();
    const isToxicDose = checkDoseToxicity(result);
    const classNameResult = Dom.getSuccessOrErrorClass(isToxicDose);

    Dom.toggleClassNames(pResultDose, classNameResult);
    Dom.showHtmlElement(pResultDose);
    displayDoseResult(result);
})

function calcParacetamolDose() {
    return Calculs.calcDoseParacetamol(inputSubjectWeight.value , inputHypotheticDose.value);
}

function displayDoseResult(result) {
    pResultDose.textContent = languages[currentLanguage].calc_dose_result.replace("resultToReplace", result);
}

function checkDoseToxicity(result) {
    return result > DOSE_VALUE_MAX;
}

