import './App.scss'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './components/LanguageSelector'
import AboutMe from './components/AboutMe'

import "/node_modules/flag-icons/css/flag-icons.min.css";

function App() {
  const { t } = useTranslation()
  return (
    <div className="App">
      <div>
        <LanguageSelector /> 
      </div>

      <AboutMe />
    </div>
    
  )
}

export default App
