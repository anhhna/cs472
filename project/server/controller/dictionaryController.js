import Dictionary from "../model/dictionary.js"

const dictionaryController = {
    searchTerm: (req, res) => {
        const term = req.params.term?.toLowerCase() || req.query.term?.toLowerCase();
        if (!term) {
            return res.status(400).json({ message: 'Search term is required' })
        }
        const entries = Dictionary.searchTerm(term)
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
    },

    updatePopularTerms: (req, res) => {
        const { term } = req.body
        let termCount = Dictionary.updatePopularTerms(term)
        res.status(200).json(termCount)
    }
}

export default dictionaryController