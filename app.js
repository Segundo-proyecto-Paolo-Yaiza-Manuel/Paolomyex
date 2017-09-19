const app = require('express')()

require('./config/passport')()
require('./config/express')(app)

const authRoutes = require("./routes/auth-routes")
const index = require('./routes/index')
const walletRoutes = require('./routes/wallet-routes')

app.use('/', authRoutes)
app.use('/', index)
app.use('/wallet', walletRoutes)

require('./config/error-handler')(app)
module.exports = app
