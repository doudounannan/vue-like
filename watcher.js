function Watcher (vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    this.value = this.get();
}

Watcher.prototype.update = function(){
    var oldValue = this.value;
    var value = this.vm.data[this.key];

    if (oldValue !== value) {
        this.value = value;
        this.cb.call(this, this.vm.data[this.key]);
    }
};

Watcher.prototype.get = function(){
    Dep.target = this;
    var value = this.vm.data[this.key];
    Dep.target = null;

    return value;
};