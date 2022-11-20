function Father(){
    this.name='father'
}

function Son(){
    this.name='son'
}

// 1. 原型链继承

/* 优点：
1.继承了父类的模板和原型上的方法和属性 */

/* 缺点：
1.创造子类实例时，没法往父类传参，必须在给子类原型实例化父类的时候传参。
2.来自原型的所有属性被所有实例共享 */

function Father(){
    this.name='father'
}

function Son(name){
    this.name=name
}

Son.prototype=new Father()

//2. 构造函数继承

/* 缺点：
1.实例并不是父类的实例，只是子类的是咧
2.只能继承父类的实例的属性和方法，没法继承父类原型上的属性和方法
3.无法实现函数的复用，每个子类都有父类实例的副本，影响性能

优点：
1.子类实例化时，可以向父类传参
2.解决了子类共享父类实例化对象问题 */

function Father(name){
    this.name=name
}

function Son(age,name){
    this.name=age
    Father.apply(this,[name])
}

// 3. 组合式继承

优点：
1.结合了原型链继承和构造函数继承的优点

缺点：
1.调用了2次构造函数，生成了2份实例
function Father(name){
    this.name=name
}

function Son(age,name){
    this.name=age
    // 执行1次
    Father.apply(this,[name])
}
// 执行2次
Son.prototype=new Father();
Son.prototype.constructor=Son

// 寄生组合式继承

// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
// const me = Object.create(person); // me.__proto__ === person
function Father(name){
    this.name=name
}

function Son(age,name){
    this.name=age
    // 执行1次
    Father.apply(this,[name])
}
Son.prototype=Object.create(Father.prototype)
Son.prototype.constructor=Son

//ES6继承
class Father{
    constructor(name){
        this.name=name
    }
}

class Son extends Father{
    constructor(name,age){
        super(name)
        this.age=age
    }
}
