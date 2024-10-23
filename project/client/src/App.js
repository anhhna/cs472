import './App.css'
import { useState, useEffect } from 'react'
import dictionaryService from './services/dictionaryService.js'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [entries, setEntries] = useState([])
  const [popularTerms, setPopularTerms] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch popular terms periodically
  useEffect(() => {
    const fetchPopularTerms = async () => {
      try {
        console.log('fetchPopularTerms')
      } catch (err) {
        console.error('Error fetching popular terms:', err)
      }
    }

    // Fetch every 25 seconds
    const intervalId = setInterval(fetchPopularTerms, 25000)
    fetchPopularTerms() // Initial fetch

    return () => clearInterval(intervalId)
  }, [])

  const handleSearch = async () => {
    if (!searchTerm) return
    setLoading(true)
    setError('')
    setEntries([])
    try {
      const data = await dictionaryService.search(searchTerm)
      setEntries(data)
    } catch (err) {
      setError('Term not found')
    }
    setLoading(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  };

  return (
    <div className="App">
      {/* header */}
      <h2>WAP Online Dictionary</h2>
      <div>
        <label>Term: </label>
        <input
          type="text"
          placeholder="Search for a term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* search result */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ol>
        {entries.map((entry, index) => (
          <li key={index}>{entry.wordtype === undefined ? '' : `(${entry.wordtype})`} :: {entry.definition}</li>
        ))}
      </ol>

      {/* popular searches */}
      <h2>Popular searches</h2>
      <ul>
        {popularTerms.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
