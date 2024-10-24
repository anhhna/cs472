const SearchForm = ({ searchTerm, setSearchTerm, handleSearch, loading }) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event)
        }
    }

    return (
        <form style={styles.container} onSubmit={handleSearch}>
            <label style={styles.label}>Term: </label>
            <input
                style={styles.input}
                type="text"
                placeholder="Search for a term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button style={styles.button} type="submit" disabled={loading}>
                {loading ? 'Looking up' : 'Look up'}
            </button>
        </form>
    )
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 25px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    label: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
        marginRight: '10px',
    },
    input: {
        marginRight: '20px',
        padding: '5px',
        width: '40%',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px'
    },
    button: {
        width: '100px',
        padding: '5px 10px',
        borderRadius: '5px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },
}

export default SearchForm
