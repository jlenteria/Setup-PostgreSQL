const express = require('express')
const app = express()
const sequelize = require('./config/sequelize.js')
const PORT = 3000

sequelize.verifiy()

app.listen(PORT, () => console.log('Server running at PORT: ', PORT))