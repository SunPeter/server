const path = require('path')
const Koa = require('koa')
const koaSend = require('./package/koa-send')

let app = new Koa()
app = require('./middlewares')(app)

app.use(koaSend({
	root: path.join(__dirname, 'view'),
	ext: 'html'
}))
app = require('./router')(app)

app.listen(3000,()=>{
    console.log('server has started in port 3000')
})