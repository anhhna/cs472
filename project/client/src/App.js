import './App.css'
import Header from './components/Header.js'
import SearchTerm from './components/SearchTerm.js'
import PopularTerms from './components/PopularTerms.js'
import Footer from './components/Footer.js'

function App() {
  return (
    <div>
      <Header/>
      <SearchTerm/>
      <PopularTerms/>
      <Footer/>
    </div>
  )
}

export default App
