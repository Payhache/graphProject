export function calcHalfLife(nb1: number, nb2: number, duration: number) {
  let Ke = (Math.log(nb1) - Math.log(nb2)) / duration
  let halfLife = Math.log(2) / Ke

  return halfLife.toFixed(1)
}

export function calcToxicity(time: number) {
  let exposant = defineExposant(time)
  let toxicity = defineToxicity(exposant)
  return toxicity
}

export function calcToxicityPossible(toxicity: number) {
  return toxicity * 300
}

export function calcToxicityProbable(toxicity: number) {
  return toxicity * 400
}

export function calcToxicityProbableWithRisk(toxicity: number) {
  return toxicity * 200
}

export function defineExposant(time: number) {
  return ((Math.log10(50) - Math.log10(200)) / 8) * time
}

export function defineToxicity(exposant: number) {
  return Math.pow(10, exposant)
}

export function calcDoseParacetamol(weight: number, dose: number) {
  return ((dose * 1000) / weight).toFixed(0)
}

export function calcTimeBetweenTwoDatesInHour(date1: string, date2: string) {
  return (Date.parse(date1) - Date.parse(date2)) / 3_600_000
}

export function convertMicromolesToMilligrams(micromoles: number) {
  return micromoles * 0.1131
}
