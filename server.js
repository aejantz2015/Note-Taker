const express = require('express')
const api = require ('./routes/index')
const PORT = 3001

const app = express()
app.use(express.static('public'))
app.use(api)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})