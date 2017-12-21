module.exports = (router) => {
    router.get('/react', async ctx => {
        await ctx.render('react.html')
    });
}