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
Promise.all([p1,p2,p3]).then(function(data){
    console.log(data)
})

