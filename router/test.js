module.exports = (router) => {
    router.get('/test', async ctx => {
        await ctx.render('base.hbs', {
        	name: 'ssd',
        })
    });
}