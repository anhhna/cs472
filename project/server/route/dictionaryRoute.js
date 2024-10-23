import express from 'express'
import dictionaryController from '../controller/dictionaryController.js'

const router = express.Router()

router.route('/search')
    .get(dictionaryController.search)

router.route('/popular')
    .get(dictionaryController.getPopularTerms)

export default router
