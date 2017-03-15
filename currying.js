var currying = function currying (fn) {
  var args = []
  return function () {
//   this.a=5
      
    if (arguments.length === 0) {
      return fn.apply(undefined, args)
    // this是什么？
    }else {
      [].push.apply(args, arguments)
      return currying
    }
  }
}
var cost = (function () {
    // this.a=10
    console.log(this.a)
  var money = 0
  return function () {
    for (var i = 0;i < arguments.length;i++) {
      money += arguments[i]
    }
    return money
  }
})()
var cost = currying(cost)
cost(100)
cost(200)
cost(300)
console.log(cost())
