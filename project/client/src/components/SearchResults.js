import React from 'react'
import { FaSpinner } from 'react-icons/fa'

const SearchResults = ({ entries, error, loading }) => {
    const renderEntry = (entry, index) => (
        <tr key={index}>
            <td style={{ ...styles.cell, ...styles.noWrap }}>{index + 1}. {entry.wordtype || ''}</td>
            <td style={styles.cell}>{entry.definition}</td>
        </tr>
    )

    return (
        <div style={styles.container}>
            {loading && <FaSpinner style={styles.spinner} />}
            {error && <p style={styles.error}>{error}</p>}
            {!loading && !error && entries.length > 0 && (
                <table style={styles.table}>
                    <tbody>
                        {entries.map(renderEntry)}
                    </tbody>
                </table>
            )}
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
    table: {
        width: '90%',
        maxWidth: '1000px',
        borderCollapse: 'collapse',
        marginTop: '20px'
    },
    cell: {
        padding: '5px',
        borderBottom: '1px solid #ddd',
        fontSize: '16px'
    },
    noWrap: {
        whiteSpace: 'nowrap',
    }
}

export default SearchResults
