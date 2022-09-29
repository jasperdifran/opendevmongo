const express = require('express')
const db = require('../db.json')
const fs = require('fs/promises')

const router = express.Router()

router.get('/', (req, res) => {
    res.send(db)
})

router.get('/:name', (req, res) => {
    db.forEach(elem => {
        if (elem.name === req.params.name) {
            res.send(elem)
            return
        }
    });
})

router.post('/addItem', async (req, res) => {
    const dbData = await fs.readFile('./db.json')
    const dbDataParsed = JSON.parse(dbData)

    dbDataParsed.push(req.body)

    await fs.writeFile('./db.json', JSON.stringify(dbDataParsed))
    res.send({message: "Item added"})
})



module.exports = router