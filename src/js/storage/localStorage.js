// var Promise = require('promise');
var AppKey = 'freeLoader_';
var storage = window.localStorage;

module.exports = (function() {
    var api = {
        set: function(key, data) {
            return Promise.resolve(storage.setItem(AppKey + key, JSON.stringify(data)));
        },

        get: function(key) {
            return Promise.resolve(storage.getItem(AppKey + key));
        }
    };

    return api;

}());


// store.set('song', {artist: 'Roxette',
//                    title: 'Listen to your heart'})
// var song = store.get('song');
// document.getElementById('song').innerHTML =
//     song.artist + ' sings "' + song.title + '"';
// store.remove('song');
