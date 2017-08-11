function wrap(app) {
  let next = app.callback
  return function(...args) {
    console.log(app.index++)
    next(...args)
  }
}
var app = {
  callback: function(...args) {
    console.log(args)
  },
  index: 0
}
app.callback = wrap(app)
app.callback = wrap(app)
app.callback = wrap(app)

app.callback('hello')

