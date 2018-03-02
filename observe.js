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
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return val;
        },
        set: function (newValue) {
            val = newValue;
            dep.notify();
        }
    });
}