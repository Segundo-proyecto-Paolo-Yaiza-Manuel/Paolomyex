const app = require('express')()

require('./config/passport')()
require('./config/express')(app)

const authRoutes = require("./routes/auth-routes")
const index = require('./routes/index')
const cardRoutes = require('./routes/card-routes')
const usersRoutes = require('./routes/user-routes')

app.use('/', authRoutes)
app.use('/', index)
app.use('/card', cardRoutes)
app.use('/users', usersRoutes)

require('./config/error-handler')(app)
module.exports = app
