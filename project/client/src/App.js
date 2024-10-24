import './App.css'
import Header from './components/Header.js'
import SearchTerm from './components/SearchTerm.js'
import PopularTerms from './components/PopularTerms.js'
import Footer from './components/Footer.js'
import { useState } from 'react'

function App() {
  const [popularTerm, setPopularTerm] = useState('')
  const handleClickPopularTerm = (term) => {
    setPopularTerm(term)
  }

  return (
    <div>
      <Header />
      <SearchTerm popularTerm={popularTerm} />
      <PopularTerms onClickPopularTerm={handleClickPopularTerm} />
      <Footer />
    </div>
  )
}

export default App
