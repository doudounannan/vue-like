function Dep () {
    this.subs = [];
    this.target = null;
}

Dep.prototype.addSub = function(sub){
    this.subs.push(sub);
};

Dep.prototype.notify = function(){
    this.subs.forEach(function(sub, index) {
        sub.update();
    });
};