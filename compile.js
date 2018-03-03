function Compile (options, vm) {
    this.compile = this;
    this.vm = vm;
    this.domEle = document.getElementById(options.el);
    this.fragment = this.createElement(this.domEle);

    this.compileElement(this.fragment);
    this.viewRefresh();
}
Compile.prototype.createElement = function (ele) {
    var fragment = document.createDocumentFragment();
    var child = ele.firstChild;

    while (child) {
        fragment.appendChild(child);
        child = ele.firstChild;
    }

    return fragment;
}

Compile.prototype.compileElement = function (el) {
    var childNodes = el.childNodes;

    [].slice.apply(childNodes).forEach((node) => {
        var reg = /\{\{(\w+)\}\}/;
        var text = node.textContent;

        if (reg.test(text)) {
            this.compileText(node, reg.exec(text)[1]);
        }

        if (node.childNodes && node.childNodes.length > 0) {
            this.compileElement(node);
        }
    });
}

Compile.prototype.compileText = function (node, key) {
    var text = this.vm[key];
    var self = this;

    self.updateText(node, text);

    new Watcher(this.vm, key, function (newText) {
        self.updateText(node, newText);
    });
}

Compile.prototype.updateText = function (node, text) {
    node.textContent = text;
}

Compile.prototype.viewRefresh = function(){
    this.domEle.appendChild(this.fragment);
};