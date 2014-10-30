var Mapster = require('./Mapster');
var mapOptions = require('./mapOptions');
var storage = require('./storage/localStorage');
var DOM = require('./DOM');
var Geo = require('./Geo');
var _ = require('./utils');

var mapElement = DOM('#map-canvas'),
    map = Mapster.create(mapElement, mapOptions),
    pos;

// var streetViewOptions = { position: mapOptions.center };
// var streetViewElement = document.getElementById('street-view');
// map.createStreetView(streetViewElement, streetViewOptions);

Geo.getPos(function(latLng) {
    map.center(latLng);
    pos = latLng;
});

var freeLoader = (function () {
    var searchField,
        searchResults,
        contextMenu;

    function getElements() {
        searchField = DOM('#search-field');
        searchResults = DOM('#search-results');
        contextMenu = DOM('#context-menu');
    }

    function createContextMenu() {
        console.log(contextMenu);
    }

    function setDistance(place) {
        place.distance = Geo.getDistance(pos, place.latLng);
    }

    function byDistance(a, b) {
        return a.distance - b.distance;
    }

    function prepareSearchResults(results) {
        if (pos) {
            results.forEach(setDistance);
            results.sort(byDistance);
        }

        return results.length > 6 ? results.slice(0, 6) : results;
    }

    function displaySearchResults(results) {
        results = prepareSearchResults(results);
        searchResults.clear();

        var searchList = document.createDocumentFragment();

        function createElement(res) {
            var li = DOM('<li>'),
                link = DOM('<a>');

            link.href = "#";
            link.textContent = res.formatted_address + ' (' + Geo.getHumanReadableDistance(res.distance) + ')';
            link.dataset.latLng = JSON.stringify(res.latLng);

            li.appendChild(link);
            searchList.appendChild(li);
        }

        _.uniqBy(results, 'formatted_address').forEach(createElement);
        searchResults.appendChild(searchList);
    }

    function geocode() {
        var address = this.value;
        if (address.length > 1) {
            map.geocode({
                address: address,
                success: displaySearchResults,
                error: function(err) {
                    console.log("Geocode error", err);
                }
            });
        }
    }

    function resetSearch() {
        searchResults.clear();
        searchField.value = "";
    }

    function addEventListeners() {
        searchField.addEventListener('input', _.debounce(geocode));

        searchResults.delegateEvent("click", 'a', function (e) {
            e.preventDefault();
            var pos = JSON.parse(e.target.dataset.latLng);
            map.center(pos);
            map.addMarker({
                position: pos,
                draggable: true,
                content: e.target.textContent
            }).on('dragend', function(e) {
                console.log('dragend', e);
            });
            resetSearch();
        });



        var pressTimer;

        function handlePress(e) {
            console.log('adding markers');
            map.addMarker({
                position: e.latLng,
                draggable: true,
                content: 'placed here'
            });
        }

        map.on('mousedown', function(e) {
            pressTimer = setTimeout(handlePress.bind(map, e), 500);
        });

        map.on('mouseup', function() {
            clearTimeout(pressTimer);
        });
    }

    function getMarkers() {
        storage.get('markers').then(function(markers) {
            console.log(markers);
        });
    }

    return {
        init: function() {
            getElements();
            addEventListeners();
            createContextMenu();
            getMarkers();
        }
    };
}());

window.addEventListener("DOMContentLoaded", freeLoader.init);

module.exports = freeLoader;
