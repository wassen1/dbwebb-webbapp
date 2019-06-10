"use strict";

import m from "mithril";


const position = {
    currentPosition: {},

    getCurrentPosition: (callback) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                position.currentPosition.lat = pos.coords.latitude;
                position.currentPosition.lng = pos.coords.longitude;
                callback(position.currentPosition.lat, position.currentPosition.lng);
            }, position.geoError, { enableHighAccuracy: true });
        }
    },

    getPosition: function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position.geoSuccess,
                position.geoError
            );
        }
    },

    geoSuccess: function (pos) {
        position.currentPosition = pos.coords;
        m.redraw();
    },

    geoError: function (error) {
        console.log('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }
};

export default position;
