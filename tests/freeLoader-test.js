var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var stubs = {
	setStreetView: sinon.stub(),
	Map: sinon.stub(),
	Geocoder: sinon.stub(),
	StreetViewPanorama: sinon.stub()
};

stubs.Map.returns({ setStreetView: stubs.setStreetView });

var google = window.google = {
	maps: {
		Map: stubs.Map,
		Geocoder: stubs.Geocoder,
		StreetViewPanorama: stubs.StreetViewPanorama
	}
};

describe("FreeLoader", function() {

	var FreeLoader = require('./../src/js/Mapster');

	function createInstance(opts) {
		var element = document.createElement('div');
		return FreeLoader.create(element, opts);
	}


	describe("ctor", function() {
		it("should have correct properties", function() {
			expect(FreeLoader).to.have.property('create');
		});
	});

	describe("#create", function() {
		it("should fail if no element is passed", function() {
			expect(FreeLoader.create).to.throw('must be HTML element');
		});

		it("should pass empty object if none was passed", function() {
			createInstance();

			expect(google.maps.Map).to.have.been.calledWithNew;
			expect(google.maps.Map.lastCall.args[1]).to.be.an('object');
		});
	});

	describe("instance", function() {
		var freeloader;

		beforeEach(function() {
			freeloader = createInstance();
		});

		describe("#createStreetView", function() {
			var res;

			beforeEach(function() {
				res = freeloader.createStreetView();
			});

			it("should create and return new streetView", function() {
				expect(res).to.be.an('object');
				expect(res).to.equal(freeloader.streetView);
				expect(stubs.StreetViewPanorama).to.have.been.calledWithNew;
			});

			it("should connect it with the map", function() {
				expect(stubs.setStreetView).to.have.been.calledWith(res);
			});
		});

		describe("#geocode", function() {
			
		});

		describe("#addMarker", function() {
			
		});

		describe("#removeMarker", function() {
			
		});

		describe("#findMarkerBy", function() {
			
		});

		describe("#center", function() {
			
		});

		describe("#zoom", function() {
			
		});

		describe("#on", function() {
			
		});
	});
});