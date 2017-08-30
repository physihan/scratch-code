/**
 * 基于生成器的异步解决方案
 * it.next()中的值代表上一次yield之后的值，如果不传入值，那么如果有变量存储这个yield的值
 * 这个变量的值将是undefined，第一次next对应第一个yield，next传入的是上一个yield的值
 * 最后一个next对应return，之后再调用值为undefined，这个过程是不可逆的，且必须手动保存yield的值
 * 应该每次调用next都传入上一步的结果
 */


promise_maker = function (num) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(num)
        }, 500)
    })
}



/**
 * 
 */
var gen=function * gen() {
    x = yield promise_maker(100)
    y = yield promise_maker(200)+2
    z = yield promise_maker(300)

    return [x, y, z]

}
/**
 * 这里fullfill和next也可以放在一起，放到一个函数逻辑里面，一定要注意gen生成的迭代器和
 * 每次next返回的不能用同一个变量表示，var it=gen();g=it.next()
 *  
 * function go (data) {
      var p = g.next(data)
      if (p.value.then) {
        return p.value.then(go)
      }else {
          resolve(p.value)   
      }
    }
    go()
 * 
 * @param {any} gen 
 * @returns 
 */
function run(gen) {
    return new Promise(function (resolve, reject) {
        var it = gen()

        function fullfill(data) {
            var g = it.next(data)
            next(g)
            
        }
    

        function next(g) {
            if (g.done) {
                resolve(g.value)
                
            }
            return g.value.then(fullfill)
        }
            fullfill()

    })

}
run(gen).then(function(data){
    console.log(data)
})