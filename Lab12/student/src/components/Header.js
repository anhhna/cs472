import React from 'react'

const Header = () => {
    return (
        <header style={styles.header}>
            <h1>Student Registration</h1>
        </header>
    )
}

const styles = {
    header: {
        backgroundColor: '#ff5722',
        color: 'white',
        textAlign: 'left',
        padding: '1px 10px'
    }
}

export default Header