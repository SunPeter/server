const fs = require('fs')
module.exports = function(app) {
    let dir = fs.readdirSync('./middlewares').filter(f => ! /index\.js/.test(f))
    for (let f of dir) {
    	app.use(require(`${__dirname}/${f}`))
    }
    return app
}
