import pg from 'pg'
const { Pool } = pg

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config()

// Create a new pool instance to connect to the PostgreSQL database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
})

export default class Dictionary {
    // Search for a term in the dictionary
    static async searchTerm(term) {
        const query = `
            SELECT * FROM entries
            WHERE LOWER(word) = $1
        `
        try {
            const result = await pool.query(query, [term.toLowerCase()])
            // Transform the rows to dictionary entry
            const formattedResult = result.rows.map(row => ({
                word: row.word,
                wordtype: row.wordtype,
                definition: row.definition
            }))
            return formattedResult
        } catch (error) {
            console.error('Error searching term:', error)
            throw error
        }
    }

    // Get the top 10 popular search terms
    static async getPopularTerms() {
        const query = `
            SELECT term, count
            FROM popular_search_terms
            ORDER BY count DESC
            LIMIT 10
        `
        try {
            const result = await pool.query(query)
            const formattedResult = result.rows.map(row => ({
                term: row.term,
                count: row.count
            }))
            return formattedResult
        } catch (error) {
            console.error('Error getting popular terms:', error)
            throw error
        }
    }

    // Update the count of a popular term, or insert a new term if it doesn't exist
    static async updatePopularTerms(term) {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')

            // Check if the term already exists
            const selectQuery = `
                SELECT * FROM popular_search_terms
                WHERE term = $1
            `
            const selectResult = await client.query(selectQuery, [term])

            if (selectResult.rowCount > 0) {
                // Term exists, update the count
                const updateQuery = `
                    UPDATE popular_search_terms
                    SET count = count + 1
                    WHERE term = $1
                    RETURNING *
                `
                const updateResult = await client.query(updateQuery, [term])
                await client.query('COMMIT')
                return updateResult.rows[0]
            } else {
                // Term does not exist, insert a new term
                const insertQuery = `
                    INSERT INTO popular_search_terms (term, count)
                    VALUES ($1, 1)
                    RETURNING *
                `
                const insertResult = await client.query(insertQuery, [term])
                await client.query('COMMIT')
                return insertResult.rows[0]
            }
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('Error updating popular terms:', error)
            throw error
        } finally {
            client.release()
        }
    }
}
