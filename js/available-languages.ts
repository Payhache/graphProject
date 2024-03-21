import french, { French } from "../lang/french"
import english from "../lang/english"

export const FRENCH = "fr" as const
export const ENGLISH = "en" as const

export type Language = typeof FRENCH | typeof ENGLISH

export const defaultLanguage =
  (new URLSearchParams(location.search).get("lang") as Language) || FRENCH

export const languages: {
  [key in Language]: French
} = {
  [FRENCH]: french,
  [ENGLISH]: english,
}

window.currentLanguage = defaultLanguage
