"use strict";

import m from "mithril";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import position from "../models/position.js";
import locationIcon from "../../location.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import particleModel from "../models/particleModel.js";
import cacheModel from "../models/cacheModel.js";

var map;
let markerLayer;
var locationMarker = L.icon({
    iconUrl: locationIcon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

function showMap(vnode) {
    map = L.map('map').fitWorld();
    map.on('moveend', function (e) {
        mapComponent.currentCenter = map.getCenter();
        mapComponent.currentBounds = map.getBounds();
        vnode.attrs.callback(e);
    });
    map.on('zoomend', function (e) {
        console.log('Zoomend: ', e);
    });

    markerLayer = L.markerClusterGroup();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: `&copy;
        <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors`
    }).addTo(map);
}

function renderPosition() {
    if (position.currentPosition.lat && position.currentPosition.lng && map) {
        L.marker(
            [
                position.currentPosition.lat,
                position.currentPosition.lng
            ],
            {
                icon: locationMarker
            }
        ).bindPopup("Din plats").addTo(map);
    }
}

function setView() {
    if (position.currentPosition.lat && position.currentPosition.lng && map) {
        if (Object.keys(mapComponent.currentCenter).length) {
            map.setView(mapComponent.currentCenter, mapComponent.currentZooLevel);
        } else {
            mapComponent.currentCenter = L.latLng(position.currentPosition.lat, position.currentPosition.lng); // eslint-disable-line max-len
            map.setView(L.latLng(mapComponent.currentCenter.lat, mapComponent.currentCenter.lng), mapComponent.currentZooLevel); // eslint-disable-line max-len
        }
    }
}

function renderCurrentParticles() {
    if (position.currentPosition.lat && position.currentPosition.lng && map) {
        markerLayer.clearLayers();
        particleModel.getCurrentParticlesFromIntersecting();
        particleModel.filterDuplicateParticles();
        particleModel.currentParticles.forEach(sample => {
            markerLayer.addLayer(
                L.marker(
                    [
                        sample.location.latitude,
                        sample.location.longitude
                    ],
                ).bindPopup(`${getParticleInfo(sample)}`)
            ).addTo(map);
        });
    } else {
        console.log('No position');
    }
}

function getParticleInfo(sample) {
    let infoString = "";

    sample.sensordatavalues.map(val => {
        let type = val.value_type;
        let value = val.value;

        if (type == "P1") {
            type = "PM 10";
        } else if (type == "P2") {
            type = "PM 2.5";
        }
        return `<b>${type}</b><br>${value}<br>`;
    }).forEach(item => {
        infoString = infoString + item;
    });
    return infoString;
}

const mapComponent = {
    currentCenter: position.currentPosition,
    lastCenter: {},
    currentZooLevel: 12,
    currentBounds: L.latLngBounds(L.latLng(0, 0), L.latLng(0, 0)),
    oninit: () => {
        position.getCurrentPosition(particleModel.getCurrentParticles);
        cacheModel.load();
    },

    oncreate: function (vnode) {
        showMap(vnode);
    },
    view: function (vnode) {
        setView();
        renderCurrentParticles();
        renderPosition();

        return [
            m("h1", vnode.attrs.label),
            m("div#map.map", "")
        ];
    }
};

export default mapComponent;
