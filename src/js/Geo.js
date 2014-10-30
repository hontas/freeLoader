var Geo,
    geo = window.navigator && window.navigator.geolocation;

function createLatLngLiteral(pos) {
    return {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
    };
}

function toRadians(number) {
    return number * Math.PI / 180;
}

Geo = (function() {
    var watchId;

    return {
        getDistance: function(posA, posB) {
            // http://www.movable-type.co.uk/scripts/latlong.html
            var lat1 = posA.lat;
            var lat2 = posB.lat;
            var lng1 = posA.lng;
            var lng2 = posB.lng;

            var R = 6371; // => km
            var φ1 = toRadians(lat1);
            var φ2 = toRadians(lat2);
            var Δφ = toRadians(lat2 - lat1);
            var Δλ = toRadians(lng2 - lng1);

            var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return R * c;
        },

        getHumanReadableDistance: function(dist) {
            return dist > 200 ? parseInt(dist / 10, 10) + 'mil'
                : dist > 10 ? parseInt(dist, 10) + 'km'
                : dist > 1 ? dist.toFixed(1) + 'km'
                : parseInt(dist * 1000, 10) + 'm';
        },

        getPos: function(callback) {
            geo.getCurrentPosition(function (position) {
                callback(createLatLngLiteral(position), position);
            });
        },

        watchPos: function(callback) {
            watchId = geo.watchPosition(function (position) {
                callback(createLatLngLiteral(position), position);
            });
        },

        clearWatch: function() {
            if (watchId) {
                geo.clearWatch(watchId);
                watchId = undefined;
            }
        }
    };
}());

module.exports = geo ? Geo : {};
