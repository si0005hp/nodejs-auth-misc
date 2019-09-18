import express from 'express'
import path from 'path'
import { authenticate } from './auth0-jwt'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const projectRootPath = `${__dirname}/../../`


app.use(express.static(path.join(projectRootPath, 'dist')))

app.get('/api/test', (req, res) => {
  res.send({ data: 'test' })
})

app.get('/api/secured-test', authenticate, (req, res) => {
  res.send({ data: 'secured-test' })
})

app.get('*', function (req, res) {
  res.sendFile(path.join(projectRootPath, 'dist', 'index.html'))
})

app.listen(3033, () => {
  console.log(`server starting -> [port] 3033 [env] ${process.env.NODE_ENV}`)
})