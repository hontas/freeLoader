var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

/* bind - polyfill 4 phantomJS */
var slice = Array.prototype.slice;
if (Function.prototype.bind === undefined) {
	Function.prototype.bind = function(context) {
		var boundArgs = slice.call(arguments, 1),
			self = this;
		return function() {
			var args = boundArgs.concat(slice.call(arguments));
			return self.apply(context, args);
		};
	};
}

describe("List", function() {

	var List = require('./../src/js/List'),
		list;

	beforeEach(function() {
		list = List.create();
	});

	describe("#ctor", function() {
		it("should set correct properties", function() {
			expect(list).to.have.property('items');
			expect(list.items).to.be.an('array').that.is.empty;
		});
	});

	describe("#add", function() {
		it("should add item to list", function() {
			list.add({});
			expect(list.items).to.not.be.empty;
		});

		it("should not add item if it is already in list", function() {
			var item = {};
			list.add(item);
			list.add(item);
			expect(list.items).to.have.length(1);
		});
	});

	describe("#addItems", function() {
		it("should add each item in passed array", function() {
			var items = ['shoe', 4, ['arr'], { bill: 'no' }];
			list.addItems(items);
			expect(list.items).to.have.length(4);
			expect(list.items[0]).to.equal(items[0]);
			expect(list.items[1]).to.equal(items[1]);
			expect(list.items[2]).to.equal(items[2]);
			expect(list.items[3]).to.equal(items[3]);
		});
	});

	describe("#remove", function() {
		var added;

		beforeEach(function() {
			added = {};
			list.add(added);
		});

		it("should remove item from list", function() {
			list.remove(added);
			expect(list.items).to.be.empty;
		});

		it("should return the removed item", function() {
			var removed = list.remove(added);
			expect(removed).to.equal(added);
		});

		it("should do nothing when passed item is not in list", function() {
			var removed = list.remove([]);
			expect(removed).to.be.undefined;
			expect(list.items).to.not.be.empty;
		});
	});

	describe("#removeItems", function() {
		var items;

		before(function() {
			items = ['shoe', 4, [1,2,3], { bill: 'no' }];
			list.addItems(items);
		});

		it("should remove each item in passed array", function() {
			list.removeItems(items);
			expect(list.items).to.be.empty;
		});
	});

	describe("with a bigger list", function() {
		var item1, item2;

		beforeEach(function() {
			item1 = { id: 1, isParty: true };
			item2 = { id: 2, isParty: true };
			list.addItems([item1, item2]);
		});

		describe("#find", function() {
			it("should return first item that callback returns true for", function() {
				var found = list.find(function(item) {
					return item.id === 2;
				});
				expect(found).to.equal(item2);
			});
		});

		describe("#findBy", function() {
			it("should return first item that fulfills predicate", function() {
				expect(list.findBy('isParty', true)).to.equal(item1);
			});

			it("should give same result if leaving out value when it should be true", function() {
				expect(list.findBy('isParty')).to.equal(item1);
			});
		});

		describe("#filter", function() {
			it("should return array with items that callback returned true for", function() {
				var filtered = list.filter(function(item) {
					return item.isParty === true;
				});

				expect(filtered).to.have.length(2);
			});
		});

		describe("#filterBy", function() {
			it("should return all items that fulfill predicate", function() {
				expect(list.filterBy('isParty')).to.have.length(2);
			});
		});
	});
});