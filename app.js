var schedule = require('node-schedule')
const app = require('express')()
const arbitrageBot = require('./config/arbitrageBot')

require('./config/passport')()
require('./config/express')(app)

const authRoutes = require("./routes/auth-routes")
const index = require('./routes/index')
const cardRoutes = require('./routes/card-routes')
const usersRoutes = require('./routes/user-routes')
const walletsRoutes = require('./routes/wallet-routes')

app.use('/', authRoutes)
app.use('/', index)
app.use('/card', cardRoutes)
app.use('/users', usersRoutes)
app.use('/wallets', walletsRoutes)


var bot = schedule.scheduleJob('*/1 * * * *', arbitrageBot)

require('./config/error-handler')(app)
module.exports = app
