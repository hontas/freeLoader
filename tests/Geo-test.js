describe("Geo", function() {
	if (global) { window = {}; }

	var geo = require('./../src/js/Geo');
	var expect = require('chai').expect;

	describe("ctor", function() {
		it("exists", function() {
			expect(geo).to.exist;
		});
	});
});