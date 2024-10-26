import './App.css'
import Header from './components/Header.js'
import SearchTerm from './components/SearchTerm.js'
import TextToSpeech from './components/TextToSpeech.js'
import PopularTerms from './components/PopularTerms.js'
import Footer from './components/Footer.js'
import { useState } from 'react'

function App() {
  const [popularTerm, setPopularTerm] = useState('')
  const [searchedTerm, setSearchedTerm] = useState('')

  const handleClickPopularTerm = (pTerm) => {
    setPopularTerm(pTerm)
  }

  const handleTermSearched = (sTerm) => {
    setSearchedTerm(sTerm)
  }

  return (
    <div>
      <Header />
      <SearchTerm
        popularTerm={popularTerm}
        onTermSearched={handleTermSearched} />
      <TextToSpeech term={searchedTerm} />
      <PopularTerms onClickPopularTerm={handleClickPopularTerm} />
      <Footer />
    </div>
  )
}

export default App
