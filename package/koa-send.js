let path = require('path'),
    fs = require('fs'),
    Hogan,
    React,
    ReactDOMServer,
    Layout = require('./layout');
let join = path.join,
    extname = path.extname,
    normalize = path.normalize
let now = new Date(),
    CACHE_TIME = 1000 * 60 * 60 * 24

/**
 *  @params option <Object>
 *  {root: String}
 *  {engine: String} 
 */


module.exports = (option) => {
    console.log(option)
    return (ctx, next) => {
        // why need to figure out ctx.render is defined or not ?
        if (ctx.render) return next()
        ctx.render = (path, data) => {
            let root = option.root || '/', 
                name = path,
                engine = option.engine,
                ext = option.ext || 'html'

            path = normalize(join(root, path)) + '.' + ext
            
            let access = fs.accessSync(path)
            // http cache
            // if (ctx.headers['if-modified-since']) {
            //     ctx.status = 304
            //     return
            // }
            ctx.type = 'html'
            if (!fs.accessSync(path)) {
                // ctx.set('Cache-Control', `max-age=${CACHE_TIME}`)
                // ctx.set('Last-Modified', now.toUTCString())
                // ctx.set('Expires', new Date(now.getTime() + CACHE_TIME * 1000).toUTCString())
                // ctx.set('Pragma', 'public')
                if (engine === 'handlebars') {
                    Hogan = Hogan || require('hogan.js')
                    let f = fs.readFileSync(path).toString()
                    ctx.body = _hoganEngine(f, data)
                } else if (engine === 'react') {
                    React = React || require('react')
                    ReactDOMServer = ReactDOMServer || require('react-dom/server')
                    let App = require(path).default
                    let template = ReactDOMServer.renderToString(<App {...data}/>)
                    ctx.body = Layout(name, {
                        title: data.title || name,
                        body: template,
                        initialState: JSON.stringify(data)
                    })
                } else {
                    let f = fs.readFileSync(path).toString()
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
    // add Template Engine 
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