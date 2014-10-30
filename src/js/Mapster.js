var google = window.google;
var List = require('./List.js');

var Mapster = (function() {
    function Mapster(element, options) {
        this.gMap = new google.maps.Map(element, options);
        this.markers = List.create();
        this.geocoder = new google.maps.Geocoder();
    }

    Mapster.prototype = {
        createStreetView: function(element, options) {
            this.streetView = new google.maps.StreetViewPanorama(element, options);
            this.gMap.setStreetView(this.streetView);
            return this.streetView;
        },

        geocode: function(options) {
            function transform(res) {
                res.latLng = {
                    lat: res.geometry.location.lat(),
                    lng: res.geometry.location.lng()
                };
                return res;
            }

            function callback(result, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    options.success(result.map(transform), status);
                } else {
                    options.error(status);
                }
            }

            this.geocoder.geocode({
                address: options.address
            }, callback);
        },

        addMarker: function(options) {
            options = options || {};
            options.map = this.gMap;

            var marker = new google.maps.Marker(options),
                infoWin;

            marker.on = function(event, callback) {
                google.maps.event.addListener(marker, event, callback);
                return this;
            };

            if (options.content) {
                infoWin = new google.maps.InfoWindow({ content: options.content });
                marker.on('click', function() {
                    if (infoWin && infoWin.map) {
                        infoWin.close();
                    } else {
                        infoWin.open(options.map, marker);
                    }
                });
            }

            this.markers.add(marker);
            return marker;
        },

        removeMarker: function(marker) {
            if (this.markers.remove(marker)) {
                marker.setMap(null);
                return marker;
            }
        },

        findMarkerBy: function(property, value) {
            return this.markers.find(function(marker) {
                return marker[property] === value;
            });
        },

        center: function(latLng) {
            if (latLng) {
                this.gMap.setCenter(latLng);
            } else {
                return this.gMap.getCenter();
            }
        },

        zoom: function(level) {
            if (level) {
                this.gMap.setZoom(level);
            } else {
                return this.gMap.getZoom();
            }
        },

        on: function(event, callback) {
            return google.maps.event.addListener(this.gMap, event, callback);
        }

    };

    return Mapster;
}());

Mapster.create = function(element, options) {
    if (element && element instanceof HTMLElement) {
        return new Mapster(element, options || {});
    }
    throw new Error('First argument to Mapster.create must be HTML element');
};

module.exports = Mapster;
