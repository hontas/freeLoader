module.exports = (function() {
    var _ = {
        first: function(array) {
            return array.length && array[0];
        },

        last: function(array) {
            return array.length && array[array.length - 1];
        },

        slice: function(arrayLikeObject) {
            return [].slice.call(arrayLikeObject);
        },

        contains: function(array, value) {
            return array.some(function(item) {
                return item === value;
            });
        },

        mapBy: function(array, prop) {
            return array.map(function(item) {
                return item[prop];
            });
        },

        find: function(array, comparator) {
            var match;
            array.some(function(item, idx, self) {
                if (comparator(item, idx, self)) {
                    match = item;
                    return true;
                }
            });
            return match;
        },

        findBy: function(array, key, value) {
            value = arguments.length > 2 ? value : true;
            return this.find(array, function(item) {
                return item[key] === value;
            });
        },

        filterBy: function(array, prop, value) {
            value = arguments.length > 2 ? value : true;
            return array.filter(function(item) {
                return item[prop] === value;
            });
        },

        reject: function(array, cb) {
            return array.filter(function(item, idx, self) {
                return !cb(item, idx, self);
            });
        },

        uniq: function(array) {
            return array.filter(function(value, index, self) {
                return self.indexOf(value) === index;
            });
        },

        uniqBy: function(array, prop) {
            return array.reduce(function(res, curr) {
                var values = _.mapBy(res, prop);
                var value = curr[prop];

                if (!_.contains(values, value)) {
                    return res.concat(curr);
                }

                return res;
            }, []);
        },

        keys: function(obj) {
            return Object.keys(obj);
        },

        get: function (obj, path) {
            if (!Array.isArray(path)) {
                return this.get(obj, path.split('.'));
            }

            if (path.length === 1) {
                return obj[path[0]];
            }

            return this.get(obj[path.shift()], path);
        },

        debounce: function(fun, offset) {
            var timeoutID;
            offset = offset || 500;

            return function() {
                var args = [].slice.call(arguments),
                    self = this;

                if ("number" === typeof timeoutID) {
                    clearTimeout(timeoutID);
                    timeoutID = null;
                }

                timeoutID = setTimeout(function() {
                    fun.apply(self, args);
                }, offset);
            };
        },

        template: function(string, context) {
            return string.replace(this._interpolateKeys, function(substr, match) {
                return this.get(context, match) || '';
            });
        },

        _interpolateKeys: /\{\{\s*([\w\.]+)\s*\}\}/g
    };

    return _;
}());
