import {
  calcToxicity,
  calcToxicityPossible,
  calcToxicityProbable,
  calcToxicityProbableWithRisk,
} from "./utils/Calculs"
import { changeGraphLanguage } from "./utils/Trads"
import { createSample } from "./utils/Sample-nommogramme"
import { showHtmlElement, hideHtmlElement } from "./utils/Dom"
import { languages } from "./available-languages"
import Chart from "chart.js/auto"

const DIFFUSION_TIME_IN_BLOOD = 4 // time in hour
const MAX_TIME_AFTER_INGESTION = 24 // time in hour

const resultText = document.querySelector<HTMLParagraphElement>(
  ".nomogram-result__text"
)
// divs
const divCalcToxParacetamol = document.querySelector<HTMLDivElement>(
  "#calculate_toxicity_div"
)
const divResult = document.querySelector<HTMLDivElement>("#container_result")
const divNoCalc = document.querySelector<HTMLDivElement>(".nomogram__form")

if (!resultText || !divCalcToxParacetamol || !divResult || !divNoCalc) {
  throw new Error("Button not found")
}

// buttons
const btnTranslation =
  document.querySelectorAll<HTMLButtonElement>(".translation__btn")
const btnCalcToxicity =
  document.querySelector<HTMLButtonElement>(".nomogram__submit")
const btnAddSample =
  document.querySelector<HTMLButtonElement>(".nomogram__btn-add")

if (!btnTranslation || !btnCalcToxicity || !btnAddSample) {
  throw new Error("Button not found")
}
btnCalcToxicity.disabled = true
btnAddSample.disabled = true

function disableBtnIfNeeded() {
  const disabled = checkBlankValues()
  if (btnAddSample) btnAddSample.disabled = disabled
  if (btnCalcToxicity) btnCalcToxicity.disabled = disabled
}

const namogramForm = document.querySelector<HTMLDivElement>(".nomogram__form")
if (!namogramForm) {
  throw new Error("Form not found")
}
const noCalcInputs = [...namogramForm.querySelectorAll("input")]
noCalcInputs.forEach((input) =>
  input.addEventListener("input", disableBtnIfNeeded)
)

// interval inputs
let ingestionIntervals = document.querySelectorAll<HTMLInputElement>(
  ".nomogram__interval-after-ingestion"
)
let paracetamolConcentrationIntervals =
  document.querySelectorAll<HTMLInputElement>(
    ".nomogram__interval-paracetamol-concentration"
  )

// checkboxs
const checkBoxPatientGotRisk =
  document.querySelector<HTMLInputElement>("#patient_got_risk")
const checkBoxAgreement =
  document.querySelector<HTMLInputElement>("#accept_agreement")

if (
  !ingestionIntervals ||
  !paracetamolConcentrationIntervals ||
  !checkBoxPatientGotRisk ||
  !checkBoxAgreement
) {
  throw new Error("Button html inputs not found")
}

const graphCanvas = document.querySelector<HTMLCanvasElement>("#nomogramGraph")
if (!graphCanvas) {
  throw new Error("Canvas not found")
}

const graph = new Chart(graphCanvas, {
  type: "line",
  data: {
    datasets: [
      {
        type: "line",
        label: "",
        fill: true,
        backgroundColor: "rgb(128, 128, 128,0.3)",
        data: [
          { x: 0, y: 620 },
          { x: 4, y: 620 },
        ],
      },
      {
        type: "line",
        label: languages[window.currentLanguage].graph_toxicity_line,
        labelName: "graph_toxicity_line",
        backgroundColor: "white",
        borderDash: [15, 10],
        borderColor: "rgb(243, 17, 41)",
        data: [
          { x: 4, y: 200 },
          { x: 24, y: 6.25 },
        ],
      },
      {
        type: "line",
        label: languages[window.currentLanguage].graph_second_line,
        labelName: "graph_second_line",
        backgroundColor: "white",
        borderColor: "rgb(140,56,197)",
        borderDash: [15, 10],
        data: [
          { x: 4, y: 150 },
          { x: 24, y: 4.6875 },
        ],
      },
      {
        type: "line",
        label: languages[window.currentLanguage].graph_riskFactor_line,
        labelName: "graph_riskFactor_line",
        backgroundColor: "white",
        borderDash: [15, 10],
        borderColor: "rgb(53,197,154)",
        data: [
          { x: 4, y: 100 },
          { x: 24, y: 3.125 },
        ],
      },
      {
        type: "line",
        label: languages[window.currentLanguage].graph_patient_saisi,
        labelName: "graph_patient_saisi",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
        data: [],
      },
    ],
    labels: [0, 4, 8, 12, 16, 20, 24],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: languages[window.currentLanguage].graph_title,
        textName: "graph_title",
      },
    },
    scales: {
      x: {
        display: true,
        min: 0,
        max: 25,
        type: "linear",
      },
      y: {
        min: 0,
        max: 600,
        display: true,
        type: "logarithmic",
      },
    },
  },
})

btnTranslation.forEach((btn) => {
  btn.addEventListener("click", () => {
    changeGraphLanguage(graph)
  })
})

function checkBlankValues() {
  const inputs = document
    .querySelector<HTMLDivElement>(".nomogram__form")
    ?.querySelectorAll("input")

  if (!inputs) throw new Error("Form not found")

  const isWithBlankValues = [...inputs].some(({ value }) => value === "")
  return isWithBlankValues
}

btnAddSample.addEventListener("click", () => {
  btnAddSample.disabled = true
  btnCalcToxicity.disabled = true
  divNoCalc.appendChild(createSample(disableBtnIfNeeded))
  ingestionIntervals = document.querySelectorAll<HTMLInputElement>(
    ".nomogram__interval-after-ingestion"
  )
  paracetamolConcentrationIntervals =
    document.querySelectorAll<HTMLInputElement>(
      ".nomogram__interval-paracetamol-concentration"
    )
})

btnCalcToxicity.addEventListener("click", () => {
  const ingestionTimes = getNonBlankValues(ingestionIntervals)
  const paracetamolConcentrations = getNonBlankValues(
    paracetamolConcentrationIntervals
  )
  const dataForGraph = createCoordinates(
    ingestionTimes,
    paracetamolConcentrations
  )
  const dataToAnalyze = selectDataToAnalyze(dataForGraph)

  if (isValidTimeAfterIngestion(ingestionTimes)) {
    const toxicities = calcToxicities(dataToAnalyze.timeAfterIngestion)
    compareToxicities(toxicities, dataToAnalyze)
    addDataToGraph(graph, dataForGraph)
  }

  if (!isValidTimeAfterIngestion(ingestionTimes)) {
    resultText.textContent =
      languages[window.currentLanguage]["title_warningBadData"]
    clearDataGraph()
  }

  showHtmlElement(divResult)
  resultText.scrollIntoView(true)
})

checkBoxAgreement.addEventListener("click", (event) => {
  if (!event.target) return

  if ((event.target as HTMLInputElement).checked == true) {
    showHtmlElement(divCalcToxParacetamol)
  } else {
    hideHtmlElement(divCalcToxParacetamol)
  }
})

// FUNCTIONS
function addDataToGraph(chart: Chart, coordinates: Coordinates) {
  for (let index = 0; index < coordinates.length; index++) {
    chart.data.datasets[4].data[index] = coordinates[index]
  }
  chart.update()
}

function clearDataGraph() {
  graph.data.datasets[4].data = []
  graph.update()
}

function isValidTimeAfterIngestion(array: number[]) {
  return array.every(
    (num) => num >= DIFFUSION_TIME_IN_BLOOD && num <= MAX_TIME_AFTER_INGESTION
  )
}

type Toxicities = {
  possible: number
  probable: number
  withRisk: number
}
function calcToxicities(timeAfterIngestion: number) {
  const toxicity = calcToxicity(timeAfterIngestion)
  const toxicities: Toxicities = {
    possible: calcToxicityPossible(toxicity),
    probable: calcToxicityProbable(toxicity),
    withRisk: calcToxicityProbableWithRisk(toxicity),
  }
  return toxicities
}

function compareToxicities(
  toxicities: Toxicities,
  dataToAnalyze: DataToAnalyze
) {
  if (!checkBoxPatientGotRisk) return
  const patientGotRisk = checkBoxPatientGotRisk.checked
  const toxicityValue = patientGotRisk
    ? toxicities.withRisk
    : toxicities.possible
  let messageId: keyof (typeof languages)["fr"] | undefined

  if (dataToAnalyze.paracetamolConcentration > toxicities.probable) {
    messageId = "toxicity_result_probable"
  } else if (dataToAnalyze.paracetamolConcentration > toxicityValue) {
    messageId = "toxicity_result_possible"
  } else if (!!dataToAnalyze.timeAfterIngestion) {
    messageId = "toxicity_result_ok"
  }

  if (!messageId) {
    return
  }

  if (!resultText) return
  resultText.dataset.result = messageId
  resultText.textContent = languages[window.currentLanguage][messageId].replace(
    "resultToReplace",
    dataToAnalyze.timeAfterIngestion.toString()
  )
}

type Coordinate = {
  x: number
  y: number
}
type Coordinates = Coordinate[]
function createCoordinates(array1: number[], array2: number[]) {
  const coordinates: Coordinates = []
  for (let index = 0; index < array1.length; index++) {
    coordinates.push({ x: array1[index], y: array2[index] })
  }
  return coordinates
}

export function getNonBlankValues(nodeList: NodeListOf<HTMLInputElement>) {
  return [...nodeList]
    .filter((input) => input.value !== "")
    .map((input) => +input.value)
}

type DataToAnalyze = {
  paracetamolConcentration: number
  timeAfterIngestion: number
}
function selectDataToAnalyze(dataForGraph: Coordinates): DataToAnalyze {
  dataForGraph = dataForGraph.sort(compare)
  const dataSelected = {
    paracetamolConcentration: dataForGraph[dataForGraph.length - 1].y,
    timeAfterIngestion: dataForGraph[dataForGraph.length - 1].x,
  }
  return dataSelected
}

function compare(a: Coordinate, b: Coordinate) {
  if (a.x < b.x) {
    return -1
  }
  if (a.x > b.x) {
    return 1
  }
  return 0
}
