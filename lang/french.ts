const french = {
  // TITLES
  need_dose: "Il est possible de calculer la dose en mg/kg",
  title_page: "Evaluation de la toxicité du paracetamol",
  title_main: "Toxicité hépatique du paracétamol",
  title_question: "HopiTox, qu'est ce que c'est ?",
  title_sub_title:
    "HopiTox est un outil dynamique reprenant l'équation de Rumack dans une interface intuitive pour évaluer le risque toxique après une prise unique massive de paracetamol. Il permet de réaliser le calcul de la dose ingérée en mg/kg, l'utilisation d'un nomogramme dynamique pour évaluer le risque toxique en fonction de la paracétamolémie, et le calcul de la demi-vie. Il ne se subsitue évidemment pas à l'avis médical ni au dialogue clinico-biologique.",
  title_warningBadData:
    "Attention le nomogramme n'est utilisable qu'entre 4 heures et 24h après ingestion.",
  nomogram_title: "Nomogramme dynamique de Rumack-Matthew",
  calc_dose_title: "Calcul de la dose en mg/kg",
  title_calc_half_life: "Calcul de la demi-vie",
  contact: "Nous contacter",
  supports_title: "Avec le soutien de : ",

  //LABELS
  label_first_sampling_time_half_life: "Date et heure du premier prélèvement :",
  label_second_sampling_time_half_life:
    "Date et heure du deuxième prélèvement :",
  label_first_concentration_half_life: "Première concentration :",
  label_Second_concentration_half_life: "Deuxième concentration :",

  // BUTTONS
  calculate_toxicity_label:
    "L'ingestion a eu lieu en prise unique, il y a moins de 24h, et avec un délai connu et fiable donc le nomogramme est utilisable. La co-administration de composés réduisant le transit (ex: opiacés) peut allonger la phase d'absorption.",
  calculate_half_life: "Calculer la demi-vie",
  patient_got_risk_label:
    "Le patient présente des facteurs de risque de d'hépatotoxicité (alcoolisme, cirrhose), le seuil de traitement est donc abaissé (ne cocher cette case que si le patient est concerné).",
  got_multiple_sampling_date_label:
    "Il est possible de faire le même calcul en entrant date et heure d'ingestion ou de prélèvement.",
  checkboxLabelHalfLife:
    "J'ai deux prélèvements et souhaite obtenir la demie vie",
  datePickerLabelFirstSample: "Première date",
  datePickerLabelSecondSample: "Deuxième date",
  calculate_toxicity_btn: "Évaluer le risque",
  calc_dose_submit_btn: "Calcul de la dose en mg/kg",

  // INPUTS
  calc_dose_patient_weight_input: "Poids du patient (kg)",
  calc_dose_paracetamol_dose_input: "Dose supposée (g)",
  calculate_toxicity_ingestion_time: "Durée post-ingestion (h)",
  calculate_toxicity_paracetamol_concentration: "Paracetamolémie (mg/L)",

  // RESULTS
  toxicity_result_probable:
    "Concentration à T+ resultToReplace h associée à un risque important de toxicité.",
  toxicity_result_possible:
    "Concentration à T+ resultToReplace h associée à un possible risque de toxicité.",
  toxicity_result_ok:
    "Concentration à T+ resultToReplace h associée à un risque faible de toxicité.",
  resultHalfLife: "La demi vie est de : ",
  badCalcul:
    "Les dates ou les concentrations saisies ne permettent pas le calcul de la demi vie.",
  calc_dose_result: "La dose ingérée est donc resultToReplace mg/kg.",
  result_calc_half_life: "Le résultat est de resultToReplace h.",

  //GRAPH
  graph_title: "Nomogramme de Rumack et Matthew",
  graph_toxicity_line:
    "Limite inférieure du groupe à haut risque probable (ligne 200)",
  graph_second_line: "Ligne de traitement ( Ligne 150, NAC)",
  graph_patient_saisi: "Concentrations du patient saisies",
  graph_riskFactor_line:
    "Ligne de traitement (NAC) si facteur de risque (ligne 100)",

  // OTHERS
  reference_title: "Références : ",
  contact_title: "HopiTox, qui est-ce ?",
  resp_scientifique: "Responsable scientifique : Dr Manon Launay, PharmD, PhD",
  resp_dev_web:
    "Developpeurs : Pierre-Henri Laurency, Maxime Rogues, Stanislas Ormières, Laurie Villeneuve",
  resp_logo: "Création du logo : Nicolas Dubtchak",

  //NAVIGATION
  item_first: "Dose",
  item_second: "Nomogramme",
  item_third: "Demi-vie",
  item_fourth: "Soutiens",

  //SLOGAN
  slogan: "Rien n'a changé, sauf le design.",
}

export type French = typeof french
export default french
