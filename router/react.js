module.exports = (router) => {
    router.get('/react', async ctx => {
        await ctx.render('index', {list: [1,2,3]})
    });
}