import { getNonBlankValues } from "../nomogramme.js";

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-HEJ8Y5PWM2');

const btnCalcHalfLife = document.querySelector('.calc-half-life__submit');
const resultHalfLife = document.querySelector('[data-text="result_calc_half_life"]')
const inputParacetamolFirstSample = document.querySelector('.first-concentration__number');
const inputParacetamolSecondSample = document.querySelector('.second-concentration__number');
const datePickerFirstSample = document.querySelector('.first-date__time');
const datePickerSecondSample = document.querySelector('.second-date__time');

btnCalcHalfLife.addEventListener('click', (event) => {

    if( resultHalfLife.classList.contains('error')) {
        return
    }

    const result = resultHalfLife.innerHTML.match(/[-+]?[0-9]*\.?[0-9]+/g).join('');
    const firstSample = inputParacetamolFirstSample.value;
    const secondSample = inputParacetamolSecondSample.value;
    const firstDate = datePickerFirstSample.value;
    const secondDate = datePickerSecondSample.value;
    gtag('event', event.target.attributes['data-text'].value, {
        'event_category': 'button',
        'event_label': 'calc-half-life',
        'value': result,
        'firstSample': firstSample,
        'secondSample': secondSample,
        'firstDate': firstDate,
        'secondDate': secondDate
    });
})


const btnCalcToxicity = document.querySelector('.nomogram__submit');

btnCalcToxicity.addEventListener('click', (event) => {
    const ingestionIntervals = document.querySelectorAll('.nomogram__interval-after-ingestion');
    const paracetamolConcentrationIntervals = document.querySelectorAll('.nomogram__interval-paracetamol-concentration');
    const ingestionTimes = getNonBlankValues(ingestionIntervals);
    const paracetamolConcentrations = getNonBlankValues(paracetamolConcentrationIntervals);
    const result = document.querySelector('.nomogram-result__text').attributes['data-result'].value;
    gtag('event', event.target.attributes['data-text'].value, {
        'event_category': 'button',
        'event_label': 'calc-toxicity',
        'value': result,
        'ingestionTimes': ingestionTimes,
        'paracetamolConcentrations': paracetamolConcentrations
    });
})

