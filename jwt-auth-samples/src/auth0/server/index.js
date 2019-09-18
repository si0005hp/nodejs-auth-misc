const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../client')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'))
})

app.listen(5000, () => console.log('Listening on port 5000...'))
