import { useState, useEffect, useRef } from 'react'
import dictionaryService from '../services/dictionaryService.js'
import SearchForm from './SearchForm.js'
import SearchResults from './SearchResults.js'

const SearchTerm = ({ popularTerm, onTermSearched }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const popularTermSetRef = useRef(false)

    useEffect(() => {
        if (popularTerm) {
            setSearchTerm(popularTerm)
            popularTermSetRef.current = true // Mark as set from a popular term
        }
    }, [popularTerm])

    useEffect(() => {
        if (searchTerm && popularTermSetRef.current) {
            handleSearch()
            popularTermSetRef.current = false // Reset after handling search
        }
    }, [searchTerm])

    const handleSearch = async (e) => {
        if (e) {
            e.preventDefault()
        }

        if (!searchTerm) return
        setLoading(true)
        setError('')
        setEntries([])
        onTermSearched('')

        // search term
        try {
            const data = await dictionaryService.searchTerm(searchTerm)
            setEntries(data)

            // set term to text to speech
            onTermSearched(searchTerm)

            // update popular terms
            try {
                await dictionaryService.updatePopularTerms(searchTerm)
            } catch (err) {
                setError('Error updating popular terms')
            }
        } catch (err) {
            setError('Term not found')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <SearchForm
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                loading={loading}
            />
            <SearchResults
                entries={entries}
                error={error}
                loading={loading}
            />
        </div>
    )
}

export default SearchTerm
