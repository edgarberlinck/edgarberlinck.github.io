import './App.scss'
import LanguageSelector from './components/LanguageSelector'
import AboutMe from './components/AboutMe'
import Podcast from './components/Podcast'

import '/node_modules/flag-icons/css/flag-icons.min.css'

function App() {
  return (
    <div className="App">
      <div>
        <LanguageSelector />
      </div>

      <AboutMe />
      <Podcast />
    </div>
  )
}

export default App
