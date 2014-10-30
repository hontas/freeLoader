var List = (function() {
	function List() {
		this.items = [];
	}

	List.prototype = {
		add: function(item) {
			if (this.items.indexOf(item) === -1) {
                this.items.push(item);
                return item;
            }
		},

		addItems: function(items) {
			items.forEach(this.add.bind(this));
		},

		remove: function(item) {
			var index = this.items.indexOf(item);
            if (index !== -1) {
                this.items.splice(index, 1);
                return item;
            }
		},

		removeItems: function(items) {
			items.forEach(this.remove.bind(this));
		},

		filter: function(callback) {
			return Array.prototype.filter.call(this.items, callback);
		},

		filterBy: function(property, value) {
			if (arguments.length < 2) { value = true; }
			return this.filter(function(item) {
				return item[property] === value;
			});
		},

		find: function(callback) {
			var match;

			this.items.some(function(item, idx, items) {
				if (callback(item, idx, items)) {
					match = item;
					return true;
				}
				return false;
			});

			return match;
		},

		findBy: function(property, value) {
			if (arguments.length < 2) { value = true; }
			return this.find(function(item) {
				return item[property] === value;
			});
		}
	};

	return List;
}());

List.create = function(params) {
	return new List(params);
};

module.exports = List;