// 这种方式只适合于不用promise直接处理数据返回值的方式，比如通过yield方式处理相邻的数据
// x = yield promise_maker(100)
// y = x + yield promise_maker(200)
// z = yield promise_maker(300)
// return [x,y,z]
// 这种generator就不适合
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1)
  }, 10000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2)
  }, 0)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3)
  }, 0)
})
Promise.all([p1, p2, p3]).then(function (data) {
  console.log(data)
})
