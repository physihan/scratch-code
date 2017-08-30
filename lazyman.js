var LazyMan=function(str){
    this.wait=false
    this.callback=[]
   
    this.mainTask=()=>console.log(`hi,this is ${str}`)
    if (!(this instanceof LazyMan))
    return new LazyMan(str)
  }
  LazyMan.prototype.sleep=function(num){
    this.mainTask()
    setTimeout(()=>this.callback.forEach(function(element) {
      element()
    }, this),num)
    return this
  }
  LazyMan.prototype.eat=function(str){
    this.callback.push(()=>{
      console.log(`Eat ${str}`);
    })
    return this
    
  }
  LazyMan.prototype.sleepFirst=function(num){
    
    setTimeout(()=>this.callback.forEach(function(element) {
      this.mainTask()
      element()
    }, this),num)
    return this
  }
  LazyMan('fxh').sleepFirst(10010).eat('dinner')