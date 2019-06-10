import L from "leaflet";

let utils = {
    getNow: () => {
        return new Date();
    },
    convertLatLngBounds: (bound) => {
        return L.latLngBounds(L.latLng(bound._southWest.lat, bound._southWest.lng), L.latLng(bound._northEast.lat, bound._northEast.lng)); // eslint-disable-line max-len
    },

    slideH: function (vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function (resolve) {
            setTimeout(function () {
                vnode.dom.classList.remove("slide-out");
                resolve();
            }, 250);
        });
    },
};

export default utils;
