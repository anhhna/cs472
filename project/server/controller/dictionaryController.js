import Dictionary from "../model/dictionary.js"

const dictionaryController = {
    search: (req, res) => {
        const term = req.query.term?.toLowerCase();
        if (!term) {
            return res.status(400).json({ message: 'Search term is required' })
        }
        const entries = Dictionary.search(term)
        if (entries) {
            res.status(200).json(entries)
        }
        else {
            res.status(404).json({ error: 'Term not found' })
        }
    },

    getPopularTerms: (req, res) => {
        const terms = Dictionary.getPopularTerms()
        res.status(200).json(terms)
    }
}

export default dictionaryController