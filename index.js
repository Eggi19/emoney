require('dotenv').config();
const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
var cors = require('cors')

app.use(express.static('public'))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1> WELCOME</h1>')
})

//import Routes
const { userRouter } = require('./routers')
app.use('/', userRouter)

app.listen(PORT, "0.0.0.0", () => {
    console.log(`server started on port ${PORT}`)
})