import { useEffect, useState } from 'react'
import dictionaryService from '../services/dictionaryService.js'

const PopularTerms = () => {
    const counterMax = 25
    const [popularTerms, setPopularTerms] = useState([])
    const [counter, setCounter] = useState(counterMax)

    // fetch popular terms
    const fetchPopularTerms = async () => {
        try {
            const data = await dictionaryService.getPopularTerms()
            setPopularTerms(data)
        } catch (error) {
            console.error('Error fetching popular terms:', error)
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

    // Split terms into two columns
    const leftColumnTerms = popularTerms.slice(0, 5)
    const rightColumnTerms = popularTerms.slice(5)

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>Popular searches</h2>
                <p style={styles.countdown}>(Next refresh: {counter} seconds)</p>
            </div>
            
            <div style={styles.columns}>
                <ul style={styles.column}>
                    {leftColumnTerms.map((term, index) => (
                        <li key={index} style={styles.term}>
                            {`0${index + 1} `}<strong>{term.term}</strong>
                        </li>
                    ))}
                </ul>
                <ul style={styles.column}>
                    {rightColumnTerms.map((term, index) => (
                        <li key={index + 5} style={styles.term}>
                            {`${index + 6 < 10 ? '0' : ''}${index + 6} `}<strong>{term.term}</strong>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const styles = {
    container: {
        width: '500px',
        margin: '50px auto 0px'
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
    }
};

export default PopularTerms
