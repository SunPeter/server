module.exports = (name, meta) => {
	return `
		<!DOCTYPE html>
		<html>
		  <head>
		    <meta charset="UTF-8">
		    <title>${meta.title}</title>
		    <script>window.__APP_INITIAL_STATE__ = ${meta.initialState}</script>
		  </head>
		  <body>
		    <div id="container">${meta.body}</div>
		    <script src='/static/${name}.js'></script>
		  </body>
		</html>
	`
}