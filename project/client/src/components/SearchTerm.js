import { useState } from 'react'
import dictionaryService from '../services/dictionaryService.js'

const SearchTerm = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSearch = async () => {
        if (!searchTerm) return
        setLoading(true)
        setError('')
        setEntries([])

        // search term
        try {
            const data = await dictionaryService.searchTerm(searchTerm)
            setEntries(data)
        } catch (err) {
            setError('Term not found')
        } finally {
            setLoading(false)
        }
        
        // update popular terms
        try {
            await dictionaryService.updatePopularTerms(searchTerm)
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    // render list of definition
    const renderEntry = (entry, index) => (
        <li key={index}>
            {entry.wordtype ? `(${entry.wordtype})` : ''} :: {entry.definition}
        </li>
    )

    return (
        <div>
            <div style={styles.container}>
                <label>Term: </label>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Search for a term"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button style={styles.button} onClick={handleSearch} disabled={loading}>
                    {loading ? 'Looking up' : 'Look up'}
                </button>
            </div>
            <div>
                {error && <p style={styles.error}>{error}</p>}
                <ol>
                    {entries.map(renderEntry)}
                </ol>
            </div>
        </div>
    )
}

const styles = {
    container: {
        padding: '8px 25px',
        backgroundColor: '#eeeeee',
    },
    error: {
        padding: '0px 25px',
        color: 'red',
    },
    input: {
        marginRight: '10px',
        padding: '5px',
    },
    button: {
        width: '100px',
        padding: '5px 10px',
    },
}

export default SearchTerm
