"use strict";

import m from "mithril";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import position from "../models/position.js";
import ordersModel from "../models/ordersModel.js";

import locationIcon from "../../location.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

var map;
var locationMarker = L.icon({
    iconUrl: locationIcon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

function getOrderPosition(geocoder) {
    return geocoder
        .search({ query: ordersModel.currentAddress });
}

function renderMarker(geocoder) {
    getOrderPosition(geocoder)
        .then((result) => {
            if (result.length > 0) {
                L.marker([result[0].y, result[0].x]).addTo(map).bindPopup(result[0].label);
            }
        });
}

function showMap() {
    map = L.map('map').fitWorld();
    // map.locate({ setView: true, maxZoom: 11 });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: `&copy;
        <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors`
    }).addTo(map);

    let geocoder = new OpenStreetMapProvider();

    if (ordersModel.currentAddress) {
        renderMarker(geocoder);
    }
}

function renderPosition() {
    if (position.currentPosition.latitude && position.currentPosition.longitude) {
        map.locate({ setView: true, maxZoom: 11 });
        L.marker(
            [
                position.currentPosition.latitude,
                position.currentPosition.longitude
            ],
            {
                icon: locationMarker
            }
        ).addTo(map).bindPopup("Din plats");
    }
}

const mapComponent = {
    oninit: position.getPosition,
    oncreate: function () {
        showMap();
    },
    view: function (vnode) {
        renderPosition();

        return [
            m("h1", vnode.attrs.label),
            m("div#map.map", "")
        ];
    }
};

export default mapComponent;
