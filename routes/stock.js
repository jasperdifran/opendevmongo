const express = require('express')
const db = require('../db.json')
const fs = require('fs/promises')

const router = express.Router()

router.get('/', (req, res) => {
    // Send back entire DB
    res.send(db)
})

router.get('/:name', (req, res) => {
    // Loop through DB
    db.forEach(elem => {
        // If name matches, send back that item
        if (elem.name == req.params.name) {
            res.send(elem)
        }
    });
})

router.post('/additem', async (req, res) => {
    // Read from DB
    let dbData = await fs.readFile('./db.json')

    // Convert to a format we can manipulate
    let dbJson = JSON.parse(dbData)

    // Add in new item
    dbJson.push(req.body)

    // Write back to DB
    await fs.writeFile('./db.json', JSON.stringify(dbJson))

    // Send response
    res.send({"message": "Item added"})
})



module.exports = router