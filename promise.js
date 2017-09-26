// 这种方式只适合于不用promise直接处理数据返回值的方式，比如通过yield方式处理相邻的数据
// x = yield promise_maker(100)
// y = x + yield promise_maker(200)
// z = yield promise_maker(300)
// return [x,y,z]
// 这种generator就不适合
// let p1 = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     resolve(1)
//   }, 10000)
// })
// let p2 = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     resolve(2)
//   }, 0)
// })
// let p3 = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     resolve(3)
//   }, 0)
// })
// Promise.all([p1, p2, p3]).then(function (data) {
//   console.log(data)
// })
// 实现promise
var PENDING = 0;
var FULFILLed = 1;
var REJECTED = 2;

function MyPromise(fn) {
  var state = PENDING;
  var value = null;
  // 存储成功或者失败的处理器由then或done带来的
  var handlers = [];

  function fulfill(result) {
    state = FULFILLed;
    value = result;
  }

  function reject(error) {
    state = REJECTED;
    value = error;
  }

  function resolve(result) {
    try {
      var then = getThen(result);
      if (then) {
        doResolve(then.bind(result), resolve, reject);
        return;
      }
      fulfill(result);
      console.log(value, state);
    } catch (e) {
      reject(e);
    }
  }

  function handle(handler) {
    if (state === PENDING) {
      handlers.push(handler);
    } else {
      if (state === FULFILLed && typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(value);
      }
      if (state === REJECTED && typeof handler.onRejected === 'function') {
        handler.onRejected(value);
      }
    }
  }
  this.done = function(onFulfilled, onRejected) {
    setTimeout(function() {
      handle({
        onFulfilled,
        onRejected
      });
    }, 0);
  };
  this.then = function(onFulfilled, onRejected) {
    var self = this;
    return new MyPromise(function(resolve, reject) {
      return self.done(
        function(result) {
          if (typeof onFulfilled === 'function') {
            try {
              return resolve(onFulfilled(result));
            } catch (error) {
              return resolve(error);
            }
          } else {
            return resolve(result);
          }
        },
        function(e) {
          if (typeof onRejected === 'function') {
            try {
              return resolve(onRejected(e));
            } catch (ex) {
              return reject(ex);
            }
          } else {
            return reject(error);
          }
        }
      );
    });
  };
  doResolve(fn, resolve, reject);
  this.state = { state, value };
}

function getThen(value) {
  var t = typeof value;
  if (value && (t === 'object' || t === 'function')) {
    var then = value.then;
    if (typeof then === 'function') {
      return then;
    }
  }
}

function doResolve(fn, onFulfilled, onRejected) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        onFulfilled(value);
      },
      function(reason) {
        if (done) return;
        done = true;
        onRejected(reason);
      }
    );
  } catch (e) {
    if (done) return;
    done = true;
    onRejected(e);
  }
}
var p = new MyPromise(function(resolve, reject) {
  resolve(1);
});

console.log(p.then(1, 2).then(1));
