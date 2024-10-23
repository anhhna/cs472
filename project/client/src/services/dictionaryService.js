import axios from 'axios'

const API_URL = 'http://localhost:3000/api/v1/dictionary';

const dictionaryService = {
    search: async (term) => {
        const response = await axios.get(`${API_URL}/search?term=${term}`)
        if (response.data.length === 0) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.data
    }
}

export default dictionaryService