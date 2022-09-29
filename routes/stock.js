const express = require('express')
const fs = require('fs/promises')
const db = require('../db')

const router = express.Router()

router.get('/', async (req, res) => {
    let items = []
    let item = await db.getStockCollection().find().toArray()
    res.send(item)
})

router.get('/:name', async (req, res) => {
    let item = await db.getStockCollection().findOne({name: req.params.name})
    res.send(item);
})

router.post('/additem', async (req, res) => {
    // Write back to DB
    await db.getStockCollection().insert(req.body);

    // Send response
    res.send({message: "Item added"})
})



module.exports = router