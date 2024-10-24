const API_URL = process.env.REACT_APP_API_URL

const dictionaryService = {
    searchTerm: async (term) => {
        const response = await fetch(`${API_URL}/terms/${term}/definition`)
        if (!response.ok) {
            throw new Error(`error: ${response.statusText}`)
        }
        const data = await response.json()
        // Check if data is empty
        if (!data || (Array.isArray(data) && data.length === 0)) {
            throw new Error(`message: Term not found`)
        }
        return data
    },

    getPopularTerms: async () => {
        const response = await fetch(`${API_URL}/terms/popular`)
        if (!response.ok) {
            throw new Error(`error: ${response.statusText}`)
        }
        return response.json()
    },

    updatePopularTerms: async (term) => {
        const response = await fetch(`${API_URL}/terms/popular`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'term': term }),
        })
        if (!response.ok) {
            throw new Error(`error: ${response.statusText}`)
        }
        return response.json()
    }
}

export default dictionaryService