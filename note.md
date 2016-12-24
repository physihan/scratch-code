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