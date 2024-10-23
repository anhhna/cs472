import fs from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dictionaryData
let popularSearchTerms = []

fs.readFile(path.join(__dirname, './englishdictionary.json'), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading dictionary file:', err)
        return
    }
    dictionaryData = JSON.parse(data)
})

export default class Dictionary {
    static search(term) {
        return dictionaryData.entries.filter(e => e.word?.toLowerCase() === term)
    }

    static getPopularTerms() {
        return popularSearchTerms
    }
}