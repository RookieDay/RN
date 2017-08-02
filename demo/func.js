var Person = function(name,age){
    this.name = name;
    this.age = age;
    this.getName = function(){
        return this.name;
    }
}
// 构造函数传递进入
function New(func){
    // 声明一个中间对象，该对象为最终返回的实例
    var res = {};
    if(func.prototype !== null){
        // 将实例的原型指向构造函数的原型
        res._proto_ = func.prototype;
    }
    // ret为构造函数执行的结果，这里通过apply，将构造函数内部的this指向修改为指向res，即为实例对象
    var ret = func.apply(res,Array.prototype.slice.call(arguments,1));
    // 当我们在构造函数中明确指定了返回对象时，那么new的执行结果就是该返回对象
    if((typeof ret === 'object' || typeof ret === 'function') && ret !== null){
        return ret;
    }
    return res;
}
var p1 = New(Person,'tom',20);
console.log(p1.getName());
console.log(p1 instanceof Person);