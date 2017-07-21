```js
var length=5;
while(length--){
    console.log(length)
}
```
这里我都忘了，自减在后面表示先取值在减1，取值的话首先是5大于0，
进入循环，这时值变为4，最后进入的是1，进入循环变为0，因此结果是
4 3 2 1 0，可以用这个来复制一个数组

```js
function cloneArray(arr){
    var length=arr?0:arr.length;
    var result=Array(length);
    while(length--){
        result[length]=arr[length];
    }
    return result;
}

```

这里通过改变array的长度来实现(接龙？)
```js
var myArr = ['foo', 'bar', 'baz'];
myArr.length = 1;
myArr.push('bin');
console.log(myArr);
//["foo", "bin"]
```


这里很迷惑，使用new运算符的时候，如果return返回的是一个对象，那就  
将赋值给定义的变量，在这里就是`var bar={x:2}`

```js
var x = 0;
function foo() {
    x++;
    this.x = x;
    return {x:2};
}
var bar = new foo();
console.log(bar.x);
//2
```
而如果return的不是对象的话就不受影响了

```js
var x = 0;
function foo() {
    x++;
    this.x = x;
    return 1；
}
var bar = new foo();
console.log(bar.x);
//1
```

typeof用以获取一个变量或者表达式的类型，typeof一般只能返回如下几个结果：
number,boolean,string,function（函数）,object（NULL,数组，对象）,undefined。

instanceof 用于判断一个变量是否某个对象的实例，比如

```js
console.log(new Number(223) instanceof Number);
//true
```
而这种基本类型的形式

```js
console.log(222 instanceof Number);
//false
console.log('esa' instanceof String);
//false
```

对于基本类型和引用类型

1. typeof操作符是检测基本类型的最佳工具；
2. 如果变量值是nul或者对象，typeof 将返回“object”；
3. instanceof用于检测引用类型，可以检测到具体的，它是什么类型的实例；
4. 如果变量是给定引用类型的实例，instanceof操作符会返回true;


z

```js
var myArr = ['foo', 'bar', 'baz'];
console.log('bar' in myArr);
//false
console.log('1' in myArr);
//true
```
这里用了的`in`只判断key在不在这个对象里，因此

```js
var myArr = {
    x:10,
    y:10
};
// myArr[2];
console.log('10' in myArr);
//false
console.log('x' in myArr);
//true
```


数组的length只和索引的最大值有关，与数组的具体属性无关，console.log
只输出数组的索引的键和值

```js
var arr = [];
arr[0]  = 'a';
arr[1]  = 'b';
arr.foo = 'c';
alert(arr.length);
//2
arr[4]  = 'b';
alert(arr.length);
//5
console.log(arr);
//["a", "b", undefined, undefined, "b"]
```

>数组拍平
使用迭代器来一个个输出拍平的数组元素

```js
flat =function *flat(arr){
    for(let i=0;i<arr.length;i++>){
        if(Object.prototype.toString.call(arr[i])==='[object Array]')
            yield *flat(arr[i])
        else yield arr[i]
    }
}
```