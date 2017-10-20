var run = function(gen) {
  var g = gen();
  var iterator = g.next();
  var step = function() {
    if (!iterator.done) {
      iterator = g.next(iterator.value);
      return step();
    } else {
      console.log('finished');
      return iterator.value
    }
  };
  return step();
};

var a=run(function*() {
  console.log('start');
  let a=yield 1;
  console.log(a);
  let b=yield a+1;
  console.log(b);
  return [a,b]
});
console.log(a);