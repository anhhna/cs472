import express from 'express'
import dictionaryController from '../controller/dictionaryController.js'

const router = express.Router()

/**
 * @swagger
 * /api/v1/dictionary/terms/definition:
 *   get:
 *     summary: Search for a term definition
 *     description: Retrieve the definition of a specified term
 *     parameters:
 *       - in: query
 *         name: term
 *         schema:
 *           type: string
 *         required: true
 *         description: The term to search for
 *     responses:
 *       200:
 *         description: A list of matching dictionary entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   word:
 *                     type: string
 *                   definition:
 *                     type: string
 *       404:
 *         description: Term not found
 */

/**
 * @swagger
 * /api/v1/dictionary/terms/definition/{term}:
 *   get:
 *     summary: Search for a term definition
 *     description: Retrieve the definition of a specified term
 *     parameters:
 *       - in: path
 *         name: term
 *         schema:
 *           type: string
 *         required: true
 *         description: The term to search for
 *     responses:
 *       200:
 *         description: A list of matching dictionary entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   word:
 *                     type: string
 *                   definition:
 *                     type: string
 *       404:
 *         description: Term not found
 */
router.route(['/terms/definition', '/terms/definition/:term'])
    .get(dictionaryController.searchTerm)

/**
 * @swagger
 * /api/v1/dictionary/terms/popular:
 *   get:
 *     summary: Get popular search terms
 *     description: Retrieve the top 10 most popular search terms
 *     responses:
 *       200:
 *         description: A list of popular terms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   term:
 *                     type: string
 *                   count:
 *                     type: integer
 *   post:
 *     summary: Update popular search terms
 *     description: Increment the search count for a specified term
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               term:
 *                 type: string
 *                 description: The term to update
 *     responses:
 *       200:
 *         description: Term updated successfully
 *       400:
 *         description: Bad request
 */
router.route('/terms/popular')
    .get(dictionaryController.getPopularTerms)
    .post(dictionaryController.updatePopularTerms)

export default router
