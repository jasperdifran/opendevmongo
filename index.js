const express = require('express');
const stockRouter = require('./routes/stock')

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

app.use(express.json())

app.use(logger);

app.use('/stock', stockRouter)

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})