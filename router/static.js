const path = require('path')
const fs = require('fs')
const config = require('config')

module.exports = (router) => {
    if (config.env === 'production') {
        console.log('static router')
        router.get('/static/*', async ctx => {
            let _path = path.join(__dirname, '../', path.normalize(ctx.path))
            console.log(_path)
            try {
                fs.accessSync(_path)
            } catch (e) {
                ctx.status = 404
                ctx.body = '404 not found'
                return
            }
            let _stats = fs.statSync(_path)
            if (_stats.isFile()) {
                ctx.type = path.extname(_path)
                ctx.body = fs.readFileSync(_path)
            } else {
                ctx.body = fs.readdirSync(_path)
            }
        });
    }
}