const express = require('express')
const schedule = require('node-schedule')

const indexRoutes = require('./routes/indexRoutes')
const path = require('path')
const home_controller = require('./controllers/home_controller')
const PORT = 3026
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')
app.use(express.json())

app.use('/', indexRoutes)

schedule.scheduleJob('0 */12 * * *', function () {
	// schedule.scheduleJob('*/2 * * * * *',function(){
	console.log('deleting created scripts.')
	home_controller.delete_created_scripts()
})
app.listen(PORT, function () {
	console.log('Server startd on port:', PORT)
})
