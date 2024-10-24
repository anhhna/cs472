import { useEffect, useState } from 'react'
import dictionaryService from '../services/dictionaryService.js'
import { FaSpinner } from 'react-icons/fa'

const PopularTerms = ({ onClickPopularTerm }) => {
    const counterMax = 25
    const [popularTerms, setPopularTerms] = useState([])
    const [counter, setCounter] = useState(counterMax)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // fetch popular terms
    const fetchPopularTerms = async () => {
        setLoading(true)
        setError('')

        try {
            const data = await dictionaryService.getPopularTerms()
            setPopularTerms(data)
        } catch (error) {
            setError('Error fetching popular terms')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Fetch the popular terms initially
        fetchPopularTerms()

        // Set up the interval for updating the countdown every second
        const countdownInterval = setInterval(() => {
            setCounter((prevCounter) => {
                if (prevCounter === 0) {
                    fetchPopularTerms()
                    return counterMax
                }
                return prevCounter - 1
            })
        }, 1000)

        // Cleanup
        return () => {
            clearInterval(countdownInterval)
        }
    }, [])

    const handleSearch = (term) => {
        if (onClickPopularTerm) {
            onClickPopularTerm(term)
        }
    }

    // Split terms into two columns
    const leftColumnTerms = popularTerms.slice(0, 5)
    const rightColumnTerms = popularTerms.slice(5)

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>Popular searches</h2>
                <p style={styles.countdown}>(Next refresh: {counter} seconds)</p>
            </div>

            <div style={styles.loading}>
                {loading && <FaSpinner style={styles.spinner} />}
                {error && <p style={styles.error}>{error}</p>}
            </div>
            {!loading && !error && (
                <div style={styles.columns}>
                    <ul style={styles.column}>
                        {leftColumnTerms.map((term, index) => (
                            <li key={index} style={styles.term}>
                                <a
                                    href=""
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleSearch(term.term)
                                    }}
                                    style={styles.link}
                                >
                                    {`0${index + 1} `}<strong>{term.term}</strong> ({term.count})
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ul style={styles.column}>
                        {rightColumnTerms.map((term, index) => (
                            <li key={index + 5} style={styles.term}>
                                <a
                                    href=""
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleSearch(term.term)
                                    }}
                                    style={styles.link}
                                >
                                    {`${index + 6 < 10 ? '0' : ''}${index + 6} `}<strong>{term.term}</strong> ({term.count})
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const styles = {
    container: {
        width: '500px',
        margin: '20px auto 50px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '-10px'
    },
    countdown: {
        fontSize: '0.9rem',
        color: '#555'
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
    },
    columns: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    column: {
        listStyleType: 'none',
        padding: 0
    },
    term: {
        marginBottom: '8px'
    },
    error: {
        padding: '0px 25px',
        color: 'red',
    },
    spinner: {
        marginTop: '20px',
        fontSize: '40px',
        color: 'blue',
        animation: 'spin 1s linear infinite'
    },
    link: {
        textDecoration: 'none',
        color: 'blue'
    }
};

export default PopularTerms
