import {
    calcToxicity,
    calcToxicityPossible,
    calcToxicityProbable,
    calcToxicityProbableWithRisk,
} from './utils/Calculs.js';
import { changeGraphLanguage } from "../js/utils/Trads.js";
import { createSample } from "../js/utils/Sample-nommogramme.js";
import { showHtmlElement, hideHtmlElement } from '../js/utils/Dom.js';
import { languages } from './available-languages.js';
import Chart from 'chart.js/auto';
import {createPdfFromGraphInfos} from '../js/utils/pdf.js'

const DIFFUSION_TIME_IN_BLOOD = 4; // time in hour

const resultText = document.querySelector('.result_text');
// divs
const divCalcToxParacetamol = document.querySelector('#calculate_toxicity_div');
const divMsgError = document.querySelector('.alertBadData');
const divResult = document.querySelector('#container_result');
const divNoCalc = document.querySelector('.no_calc_container');

// buttons
const btnExportPdf = document.querySelector('.export_pdf')
const btnTranslation = document.querySelectorAll('.btn_translation');
const btnCalcToxicity = document.querySelector('.calculate_toxicity_btn');
const btnAddSample = document.querySelector('.add_sample');
btnCalcToxicity.disabled = true
btnAddSample.disabled = true
function disableBtnIfNeeded () {
    const disabled = checkBlankValues()
    btnAddSample.disabled = disabled
    btnCalcToxicity.disabled = disabled
}

const noCalcInputs = [...document.querySelector('.no_calc_container').querySelectorAll('input')]
noCalcInputs.forEach(input => input.addEventListener('input', disableBtnIfNeeded))


// interval inputs
let ingestionIntervals = document.querySelectorAll('.interval_after_ingestion');
let paracetamolConcentrationIntervals = document.querySelectorAll('.interval_paracetamol_concentration');

// checkboxs
const checkBoxPatientGotRisk = document.querySelector('#patient_got_risk');
const checkBoxAgreement = document.querySelector('#accept_agreement');

const graphCanvas = document.querySelector('#nomogramGraph');
const graph = new Chart(graphCanvas, {
    data: 
    {
        datasets: 
        [
            {
                type: 'line',
                label: "",
                fill: true,
                backgroundColor: 'rgb(128, 128, 128,0.3)',
                data: [{x:0, y:620}, {x:4, y:620}]
            },    
            {
                type: 'line',
                label: languages[currentLanguage].graph_toxicity_line,
                labelName: "graph_toxicity_line",
                backgroundColor: 'white',
                borderDash: [15,10],
                borderColor: 'rgb(243, 17, 41)',
                data: [{x:4, y:200}, {x:24, y:6.25}]
            },
            {
                type: 'line',
                label: languages[currentLanguage].graph_second_line,
                labelName: "graph_second_line",
                backgroundColor: 'white',
                borderColor: 'rgb(140,56,197)',
                borderDash: [15,10],
                data: [{x:4, y:150}, {x:24, y:4.6875}],
            },
            {
                type: 'line',
                label: languages[currentLanguage].graph_riskFactor_line,
                labelName: "graph_riskFactor_line",
                backgroundColor: 'white',
                borderDash: [15,10],
                borderColor: 'rgb(53,197,154)',
                data: [{x:4, y:100}, {x:24, y:3.125}],
            },
            {
                type: 'line',
                label: languages[currentLanguage].graph_patient_saisi,
                labelName: "graph_patient_saisi",
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)',
                data: []
            }
        ],
        labels: [0,4,8,12,16,20,24]
    },
    options: 
    {
        responsive: true,
        maintainAspectRatio: false,
        plugins: 
        {
            title: 
            {
                display: true,
                text: languages[currentLanguage].graph_title,
                textName: "graph_title"
            }
        },
        scales: 
        {
            x: 
            {
                display: true,
                min:0,
                max:25,
                type: 'linear'
            },
            y: 
            {
                min:0,
                max:600,
                display: true,
                type: 'logarithmic'
            }
        }
    }
});

btnTranslation.forEach(btn => {
    btn.addEventListener("click", () => {
        changeGraphLanguage(graph, currentLanguage);
    })
});

function checkBlankValues () {
    const inputs = document.querySelector('.no_calc_container').querySelectorAll('input')
    const isWithBlankValues = [...inputs].some(({value}) => value === '')
    return isWithBlankValues
}


btnAddSample.addEventListener("click", () => {
    btnAddSample.disabled = true
    btnCalcToxicity.disabled = true
    divNoCalc.appendChild(createSample(disableBtnIfNeeded));
    ingestionIntervals = document.querySelectorAll('.interval_after_ingestion');
    paracetamolConcentrationIntervals = document.querySelectorAll('.interval_paracetamol_concentration');
});

btnCalcToxicity.addEventListener("click", () => {
    const ingestionTimes = getNonBlankValues(ingestionIntervals);
    const paracetamolConcentrations = getNonBlankValues(paracetamolConcentrationIntervals);
    const dataForGraph = createCoordinates(ingestionTimes, paracetamolConcentrations);
    const dataToAnalize = selectDataToAnalyze(dataForGraph);
    
    if(isValidTimeAfterIngestion(ingestionTimes)) {
        const toxicities = calcToxicities(dataToAnalize.timeAfterIngestion);
        compareToxicities(toxicities, dataToAnalize);
        addDataToGraph(graph, dataForGraph);
    }
    
    if(!isValidTimeAfterIngestion(ingestionTimes)) { 
        resultText.textContent = languages[currentLanguage]['title_warningBadData']
        clearDataGraph();
    }
    
    showHtmlElement(divResult);
    resultText.scrollIntoView(true);
    
})

checkBoxAgreement.addEventListener("click", (event) => {
    if(event.target.checked == true) {
        showHtmlElement(divCalcToxParacetamol);
    } else {
        hideHtmlElement(divCalcToxParacetamol);
    }
})

btnExportPdf.addEventListener("click", () => {
    const pdf = createPdfFromGraphInfos(graph, resultText.textContent, graphCanvas)
})

// FUNCTIONS
function addDataToGraph(chart, coordonates) {
    for (let index = 0; index < coordonates.length; index++) {
        chart.data.datasets[4].data[index] = coordonates[index];
    }
    chart.update();
}

function clearDataGraph() {
    graph.data.datasets[4].data = [];
    graph.update();
}

function isValidTimeAfterIngestion(array) {
     return array.every(num => num >= DIFFUSION_TIME_IN_BLOOD); 
}

function calcToxicities(timeAfterIngestion) {
    const toxicity = calcToxicity(timeAfterIngestion);
    const toxicities = {
        possible: calcToxicityPossible(toxicity),
        probable: calcToxicityProbable(toxicity),
        withRisk: calcToxicityProbableWithRisk(toxicity)
    }
    return toxicities;
}


function compareToxicities(toxicities, dataToAnalize) {
    const patientGotRisk = checkBoxPatientGotRisk.checked;
    const toxicityValue = patientGotRisk ? toxicities.withRisk : toxicities.possible;
    let messageId

    if (dataToAnalize.paracetamolConcentration > toxicities.probable) {
        messageId = 'toxicity_result_probable'
    } else if (dataToAnalize.paracetamolConcentration > toxicityValue) {
        messageId = 'toxicity_result_possible'
    } else if (dataToAnalize.timeAfterIngestion != false) {
        messageId = 'toxicity_result_ok'
    }

    if (!messageId) {
        return
    }
    resultText.textContent = languages[currentLanguage][messageId].replace('resultToReplace', dataToAnalize.timeAfterIngestion);
}

function createCoordinates(array1, array2) {
    const coordinates = [{}];
    for (let index = 0; index < array1.length; index++) {
        coordinates.push({x:array1[index], y: array2[index]});
    }
    return coordinates;
}


function getNonBlankValues(nodeList) {
    return [...nodeList]
        .filter(input => input.value !== '')
        .map(input => +input.value);
}

function selectDataToAnalyze(dataForGraph) {
    dataForGraph = dataForGraph.sort(compare);
    const dataSelected = {
        paracetamolConcentration: dataForGraph[dataForGraph.length-1].y, 
        timeAfterIngestion: dataForGraph[dataForGraph.length-1].x 
    }
    return dataSelected
}

function compare(a, b) {
    if (a.x < b.x) {
        return -1;
    }
    if (a.x > b.x) {
        return 1;
    }
    return 0;
}

