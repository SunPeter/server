let path = require('path'),
    fs = require('fs')
let join = path.join,
    extname = path.extname,
    normalize = path.normalize
let now = new Date(),
    CACHE_TIME = 1000 * 60 * 60 * 24
let Hogan = require('hogan.js')

module.exports = (option) => {
    return (ctx, next) => {
        // why need to figure out ctx.render is defined or not ?
        if (ctx.render) return next()
        ctx.render = (path, data) => {
            let root = option.root || ''
            path = normalize(join(root, path))
            let ext = option.ext || extname(path)
            console.log(ext)
            switch (ext) {
                case 'js':
                     break;
                case 'css':
                     break;
                default:
                     ctx.type = 'html'
            }
            let access = fs.accessSync(path)
            // http cache
            // if (ctx.headers['if-modified-since']) {
            //     ctx.status = 304
            //     return
            // }
            if (!fs.accessSync(path)) {
                // ctx.set('Cache-Control', `max-age=${CACHE_TIME}`)
                // ctx.set('Last-Modified', now.toUTCString())
                // ctx.set('Expires', new Date(now.getTime() + CACHE_TIME * 1000).toUTCString())
                // ctx.set('Pragma', 'public')

                let f = fs.readFileSync(path).toString()

                if (ext === 'hbs') {
                    ctx.body = _hoganEngine(f, data)
                } else if (ext === 'jsx') {
                    ctx.body = f
                } else {
                    ctx.body = f
                }
            } else {
                throw new Error('error')
            }
        }
        return next()
    }
}



function _hoganEngine(f, data) {
    // add Template Enginer 
    let template = Hogan.compile(f)

    // load partial
    let partial = _readPartial(join(__dirname, '../view/partial'))
    return template.render(data, partial);
}
function _readPartial(dir) {
    let list = fs.readdirSync(dir)
    let p = {}
    list.forEach(item => {
        let k = item.split('.')[0]
        p[k] = fs.readFileSync(join(dir, item)).toString()
    })
    return p
}