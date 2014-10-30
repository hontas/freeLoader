/*jshint maxcomplexity: 6 */
module.exports = function(selector) {
    if ("string" !== typeof selector) {
        throw new Error('selector must be string');
    }

    function addMethods(node) {
        node.clear = function() {
            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }
        };

        node.delegateEvent = function(evt, selector, callback) {
            var self = this;
            this.addEventListener(evt, function (e) {
                if (e.target.matches(selector)) {
                    callback.call(self, e);
                }
            }, false);
        };
        return node;
    }

    var idPattern = /^#\w+(\-\w+)*$/,
        createPattern = /^<(\w+)>$/i;

    if (createPattern.test(selector)) {
        return document.createElement(selector.slice(1, -1));
    }

    if (idPattern.test(selector)) {
        return addMethods(document.getElementById(selector.slice(1)));
    }

    return document.querySelectorAll(selector);
};
