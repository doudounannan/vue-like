function observe(data) {
    if (!data || typeof data !== 'object') {
        return ;
    }

    Object.keys(data).forEach((val, key) => {
        defineReactive(data, val, data[val]);
    })
}

function defineReactive(data, key, val) {
    var dep = new Dep();
    observe(val);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log(`获取参数${key},值为${val}`);
            dep.addSub(<watch>);
            return val;
        },
        set: function (newValue) {
            dep.notify();
            console.log(`修改参数${key},变为${val}`);
            val = newValue;
        }
    });
}

var obj = {
    type: 'object',
    data: {
        a: 'a'
    }
}

observe(obj);