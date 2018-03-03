function Vue (options) {
    var self = this;
    this.vm = this;
    this.data = options.data;
    this.method = options.method;

    Object.keys(this.data).forEach(function(property, index) {
        self.proxyProperty(property);
    });

    observe(this.data);
    new Compile(options, this.vm);
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