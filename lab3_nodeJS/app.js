require('./db/connection')
const express = require('express')
const userRoutes = require('./routes/user.routes')
const secRoutes = require('./routes/sec.routes')
const app= express()
app.use(express.json())
app.use(userRoutes)
app.use(secRoutes)


app.listen(8081)
