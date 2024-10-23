import express from 'express'
import dictionaryController from '../controller/dictionaryController.js'

const router = express.Router()

// use params or query
router.route(['/terms/definition', '/terms/definition/:term'])
    .get(dictionaryController.searchTerm)

router.route('/terms/popular')
    .get(dictionaryController.getPopularTerms)
    .post(dictionaryController.updatePopularTerms)

export default router
