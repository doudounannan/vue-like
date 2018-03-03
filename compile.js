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
        var self = this;

        if (node.nodeType === 1) {
            var nodeAttrs = node.attributes;

            Array.prototype.forEach.call(nodeAttrs, function(atttribute, index) {
                var attrName = atttribute.name;

                if (self.isDirective(attrName)) {
                    var exp = atttribute.value;
                    var dir = attrName.substr(2);

                    if (self.isModelDirective(dir)) {
                        self.compileModel(node, self.vm, exp);

                        node.addEventListener('input', (e) => {
                            self.vm[exp] = node.value;
                        });
                    } else {
                        // 指令事件
                        node.addEventListener(dir.substr(3), self.vm.method[exp].bind(self.vm));
                    }

                    node.removeAttribute(attrName);
                }
            });

            if (node.childNodes && node.childNodes.length > 0) {
                this.compileElement(node);
            }
        }

        if (node.nodeType === 3) {
            if (reg.test(text)) {
                this.compileText(node, reg.exec(text)[1]);
            }
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

Compile.prototype.isDirective = function(attrName){
    return /^v-\w+/.test(attrName);
};

Compile.prototype.isModelDirective = function(dir){
    return dir === 'model';
};

Compile.prototype.compileModel = function(node, vm, exp){
    node.value = vm[exp];
};