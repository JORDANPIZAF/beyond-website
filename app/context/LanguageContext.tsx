'use client'

import { createContext, useContext, useSyncExternalStore, ReactNode } from 'react'
import { translations, Lang } from '../i18n/translations'

type LanguageContextType = {
  lang: Lang
  t: typeof translations.es
  setLang: (l: Lang) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  t: translations.es,
  setLang: () => {},
})

let langListeners: Array<() => void> = []
function subscribeLang(callback: () => void) {
  langListeners.push(callback)
  return () => { langListeners = langListeners.filter((l) => l !== callback) }
}
function getLangSnapshot(): Lang {
  return localStorage.getItem('beyond-lang') === 'en' ? 'en' : 'es'
}
function getLangServerSnapshot(): Lang {
  return 'es'
}
function setStoredLang(l: Lang) {
  localStorage.setItem('beyond-lang', l)
  langListeners.forEach((callback) => callback())
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribeLang, getLangSnapshot, getLangServerSnapshot)

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang: setStoredLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
