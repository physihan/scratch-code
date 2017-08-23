// 每次修改调用函数，使用闭包保存上一次的调用函数
function wrap(app) {
  let next = app.callback
  return function (...args) {
    console.log(app.index++)
    next(...args)
  }
}
var app = {
  callback: function (...args) {
    console.log(args)
  },
  index: 0
}
app.callback = wrap(app)
app.callback = wrap(app)
app.callback = wrap(app)

app.callback('hello')

// 使用组合调用来实现中间件，redux中间件实现方式
function f(next) {
  return (action) => {
    console.log('f')
    return next(action)
  }
}

function g(next) {
  return (action) => {
    console.log('g')
    return next(action)
  }
}

function h(next) {
  return (action) => {
    console.log('h')
   return  next(action)
  }
}

function callback(action) {
  console.log(action)
  return action
}
// 第一种实现
function compose () {
  var fns = arguments;

  return function (result) {
    for (var i = fns.length - 1; i > -1; i--) {
      result = fns[i].call(this, result);
    }

    return result;
  };
};
// 用reduce简化
var compose1 = function(...args) {
  var last = args[args.length - 1];
  var rest = args.slice(0, -1);
  return (x) => {
    return rest.reduceRight(function(pre, cur) {
      return cur(pre)
    },last(x))
  }
}
compose(f,g,h)(callback)('ss')
// 这里可以使用compose组合函数
// compose(f,g,h,callback)('ssa')
// f(g(h(callback)))('ssa')