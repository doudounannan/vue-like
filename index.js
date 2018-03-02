function Vue (data, dom, key) {
    this.data = data;
    observe(data);
    dom.innerHTML = data[key];

    var self = this;
    Object.keys(this.data).forEach(function(property, index) {
        self.proxyProperty(property);
    });

    var watcher = new Watcher(this, key, function (name) {
        dom.innerHTML = name;
    });
}

Vue.prototype.proxyProperty = function(property){
    Object.defineProperty(this, property, {
        configurable: true,
        get: function () {
            return this.data[property];
        },
        set: function (value) {
            this.data[property] = value;
        }
    });
};