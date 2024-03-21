import { French } from "./french"

const english: French = {
  // TITLES
  need_dose: "A tool to calculate the dose in mg/kg is available.",
  title_page:
    "Assessment of acetaminophen toxicity using an online dynamic Rumack-Matthew nomogram",
  title_main: "je ne sais pas ce que je dois écrire",
  title_question: "HopiTox, what is it ?",
  title_sub_title:
    "HopiTox is an online dynamic nomogram based on Rumack equation in order to assess the potential risk for hepatotoxicity after acetaminophen acute overdose. Here are tools to calculate dose in mg/kg or acetaminophen half-life when two samples are withdrawn, and a dynamic nomogram in a user-friendly interface. HopiTox is a tool, not a replacement for medical or biological advice.",
  title_warningBadData:
    "Rumack-Matthew nomogram should be used within 4 to 24h after ingestion",
  nomogram_title: "Rumack-Matthew dynamic nomogram for acetaminophen overdose",
  calc_dose_title: "Calculation of the dose in mg/kg",
  title_calc_half_life: "Half life calculation",
  contact: "Contact us",
  supports_title: "With the scientific support of :",

  //LABELS
  label_first_sampling_time_half_life: "First sampling time :",
  label_second_sampling_time_half_life: "Second sampling time :",
  label_first_concentration_half_life: "First concentration :",
  label_Second_concentration_half_life: "Second concentration :",

  // BUTTONS
  calculate_toxicity_label:
    "Use of the Rumack-Matthew nomogram in management of acetaminophen overdose is only acceptable when the acuity of ingestion is known to be within 24 hours.",
  calculate_half_life: "Half-life calculation",
  patient_got_risk_label:
    "Patient has risk factors for enhanced hepatotoxicity (e.g. starvation or malnutrition, consumption of enzyme inducing drugs, a history of chronic alcohol use and chronic debilitating disease), the 100-line should therefore be used. ",
  got_multiple_sampling_date_label: "on vire",
  checkboxLabelHalfLife:
    "Two samples were withdrawn, what is the elimination half-life?",
  datePickerLabelFirstSample: "Date and time of the first sample",
  datePickerLabelSecondSample: "Date and time of the second sample",
  calculate_toxicity_btn: "Risk assessment",
  calc_dose_submit_btn: "Calculate the dose in mg/kg",

  // INPUTS
  calc_dose_patient_weight_input: "Patient's weight (kg)",
  calc_dose_paracetamol_dose_input: "Assumed acetaminophen dose (g)",
  calculate_toxicity_ingestion_time: "Time since ingestion (h)",
  calculate_toxicity_paracetamol_concentration: "Paracetamolemia (mg/L)",

  // RESULTS
  toxicity_result_probable:
    "Concentration at T+ resultToReplace h is associate with probable hepatic toxicity",
  toxicity_result_possible:
    "Concentration at T+ resultToReplace h is associate with possible hepatic toxicity",
  toxicity_result_ok:
    "Concentration at T+ resultToReplace h is associate with low risk of hepatic toxicity",
  resultHalfLife: "The half-life is : ",
  badCalcul: "Half-life could not be calculated. Please verify the data.",
  calc_dose_result: "The ingested dose is resultToReplace mg/kg.",
  result_calc_half_life: "The result is resultToReplace h.",

  // GRAPH
  graph_title: "Rumack and Matthew nomogram",
  graph_toxicity_line: "Probable toxicity line (200-line)",
  graph_second_line: "Treatment line (150-line)",
  graph_patient_saisi: "Patient's concentration",
  graph_riskFactor_line: "100-line",

  // OTHERS
  reference_title: "References : ",
  contact_title: "HopiTox, who is it ?",
  resp_scientifique: "Scientific officer : Dr Manon Launay, PharmD, PhD",
  resp_dev_web:
    "Developers : Pierre-Henri Laurency, Maxime Rogues, Stanislas Ormières, Laurie Villeneuve",
  resp_logo: "Logo design : Nicolas Dubtchak",

  //NAVIGATION
  item_first: "Dose",
  item_second: "Nomogram",
  item_third: "Half-life",
  item_fourth: "Supports",

  //SLOGAN
  slogan: "Only design has changed.",
}

export default english
