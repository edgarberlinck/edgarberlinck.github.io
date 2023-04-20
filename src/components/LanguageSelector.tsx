import { useTranslation } from 'react-i18next'
import { SupportedLanguages } from './common/types'

const supportedLanguages: SupportedLanguages = {
  pt: { nativeName: 'Português', flag: 'br' },
  en: { nativeName: 'English', flag: 'us' },
  se: { nativeName: 'Svenska', flag: 'se' }
}

export default function LanguageSelector() {
  const { i18n } = useTranslation()

  return <>{
    Object.keys(supportedLanguages).map((lang: string) => <span className={`fi fi-${supportedLanguages[lang].flag} ${i18n.resolvedLanguage === lang ? 'fi-selected' : ''}`} key={lang} onClick={() => i18n.changeLanguage(lang)} aria-aria-label={supportedLanguages[lang].nativeName}></span>)
  }</>
}