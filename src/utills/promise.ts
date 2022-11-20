
function _Promise(excute: (resolve: any, reject: any) => unknown) {
    this.status = 'pending'
    this.value = null
    this.reason = null
    this.onFulfilledArray = [];
    this.onRejectedArray = []
    const resolve = (value: any) => {
        if (this.status === 'pending') {
            queueMicrotask(() => {
                this.status = 'fulfilled';
                this.value = value
                this.onFulfilledArray.forEach(fn => fn(value))

            })
        }

    }
    const reject = (reason: any) => {
        if (this.status === 'pending') {
            queueMicrotask(() => {
                this.status = 'rejected'
                this.reason = value
                this.onRejectedArray.forEach(fn => fn(reason))
            })
        }
    }
    excute(resolve, reject)
}

_Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled !== 'function' ? data => data : onFulfilled
    onRejected = typeof onRejected !== 'function' ? error => { throw error } : onRejected
    let promise2;
    if (this.status === 'fulfilled') {
        console.log('进入了fulfilled')
        return new _Promise((resolve, reject) => {
            queueMicrotask(() => {
                try {
                    let result = onFulfilled(this.value)
                    resolve(result)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
    if (this.status === 'rejected') {
        onRejected(this.reason)
    }
    if (this.status === 'pending') {
        return new _Promise((resolve, reject) => {
            this.onFulfilledArray.push(() => {
                try {
                    let result = onFulfilled(this.value)
                    resolve(result)
                } catch (e) {
                    reject(e)
                }
            })
            this.onRejectedArray.push(() => {
                try {
                    let result = onRejected(this.reason)
                    reject(result)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
}


class _Promise1 {
    constructor(fn) {
        this.status = 'pending';
        this.reason = null;
        this.value = null;
        this.onRejectedArray = [];
        this.onFulfilledArray = [];
        fn(this.resolve.bind(this), this.reject.bind(this));
    }
    resolve(value) {
        queueMicrotask(() => {
            this.value = value;
            this.status = 'fulfilled';
            this.onFulfilledArray.forEach(fn => fn(this.value));
        })
    }
    reject(reason) {
        queueMicrotask(() => {
            this.reason = reason;
            this.status = 'rejected';
            this.onRejectedArray.forEach(fn => fn(this.reason));
        })
    }
    then(onFulfilled, onRejected) {
        if (this.status === 'fulfilled') {
            onFulfilled(this.value);
        }
        if (this.status === 'rejected') {
            onRejected(this.reason)
        }
        if (this.status === 'pending') {
            this.onRejectedArray.push(() => {
                onFulfilled(this.value)
            })
            this.onRejectedArray.push(() => {
                onFulfilled(this.reason)
            })
        }
    }
}

class LazyMan {
    constructor(name) {
        this.name = name;
        this.taskList = [];
        console.log('Hi i am ' + name)
        setTimeout(() => {
            this.next()
        }, 0)
    }
    next() {
        let fn = this.taskList.shift();
        console.log('fn', fn)
        fn && fn()
    }
    sleep(time) {
        this.taskList.push(() => {
            setTimeout(() => {
                console.log('等待了' + time + '秒' + '...')
                this.next()
            }, time * 1000)
        })
        return this
    }
    eat(food) {
        this.taskList.push(() => {
            console.log('i am eating' + food)
            this.next()
        })
        return this
    }
    sleepFist(time) {
        this.taskList.unshift(() => {
            setTimeout(() => {
                console.log('等待了' + time + '秒' + '...')
                this.next()
            }, time * 1000)
        })
        return this
    }
}
function creatLazyMan(name) {
    return new LazyMan(name)
}

function _instanceof(obj, func) {
    if (!(obj && ['object', 'function'].includes(typeof obj))) {
        return false
    }
    let proto = Object.getPrototypeOf(obj)
    if (proto === func.prototype) {
        return true
    } else if (proto === null) {
        return false
    } else {
        _instanceof(proto, func)
    }
}
export { _Promise, _Promise1, creatLazyMan, _instanceof }
