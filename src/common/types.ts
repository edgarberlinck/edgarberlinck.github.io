export type Language = {
  nativeName: string,
  flag: string
}

export type Dictionary<T> = {
  [key: string]: T
}

export type SupportedLanguages = Dictionary<Language>