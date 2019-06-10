import m from "mithril";
import mapComponent from "../components/mapComponent";
import cacheModel from "./cacheModel.js";
import L from "leaflet";
import utils from "./utils.js";

function isIntersectingBound(bound) {
    let currentBound = utils.convertLatLngBounds(mapComponent.currentBounds);
    let theBound = utils.convertLatLngBounds(bound);

    return currentBound.intersects(theBound);
}

var searchXHR = null;

function abortPreviousSearch() {
    if (searchXHR !== null) {
        searchXHR.abort();
    }
    searchXHR = null;
}

var particleModel = {
    allParticles: [],
    currentParticles: [],
    currentRange: 5,
    cachedParticles: [],
    hasAllInCache: false,
    lastGetRequest: 0,
    currentIntersectingBounds: [],

    getAllParticles: () => {
        return m
            .request({
                url: `http://api.luftdaten.info/v1/filter/country=SE`,
                method: "GET"
            })
            .then(result => {
                particleModel.allParticles = result;
            });
    },

    getCurrentParticles: (lat, lng) => {
        abortPreviousSearch();
        let now = Date.now();
        let url = encodeURIComponent(`http://api.luftdaten.info/v1/filter/area=${+lat},${+lng},${particleModel.currentRange}`); // eslint-disable-line max-len

        if (particleModel.ifContains(mapComponent.currentBounds)) {
            if (navigator.connection.type == 'none') {
                console.log('Takes from cache no connection');
                return;
            } else if ((now - particleModel.lastGetRequest) < 60000) {
                console.log('Takes from cache not older than 1min');
                return;
            }
        }

        return m.request({
            url: "http://www.student.bth.se/~efostud/api-proxy/proxy.php?url=" + url,
            method: "GET",
            config: function (xhr) { searchXHR = xhr }, // eslint-disable-line semi
        })
            .then(function (result) {
                if (result) {
                    particleModel.lastGetRequest = now;
                    particleModel.filterOldParticles();
                    particleModel.cachedParticles.push({ id: now, data: result, bounds: mapComponent.currentBounds }); // eslint-disable-line max-len
                    cacheModel.write(particleModel.cachedParticles);
                }
            }).catch(function (e) {
                console.error(e.message);
            });
    },
    filterDuplicateParticles: () => {
        let uniqe = {};

        particleModel.currentParticles.forEach(v => {
            uniqe[v.id] = v;
        });
        particleModel.currentParticles = Object.values(uniqe);
    },
    filterOldParticles: () => {
        let now = Date.now();

        particleModel.cachedParticles = particleModel.cachedParticles.filter(obj => {
            return now - obj.id < 3600000;                            //1h(3600000)
        });
    },
    getCurrentParticlesFromIntersecting: () => {
        particleModel.currentParticles = [];

        particleModel.getIntersectingBounds(particleModel.cachedParticles);
        particleModel.currentIntersectingBounds.forEach((batch) => {
            batch.data.forEach(sample => {
                particleModel.currentParticles.push(sample);
            });
        });
    },
    getIntersectingBounds: (cached) => {
        if (cached.length > 0) {
            particleModel.currentIntersectingBounds = [];
            cached.forEach(entry => {
                if (Object.entries(entry.bounds).length > 0 && isIntersectingBound(entry.bounds)) {
                    particleModel.currentIntersectingBounds.push(entry);
                }
            });
        }
    },
    ifContains: (currentBound) => {
        let containsCurrentBound = true;
        let max = 2;

        for (let i = 1; i <= max; i++) { //uppdelningar
            let Hdist = (currentBound._northEast.lng - currentBound._southWest.lng) / i;
            let Vdist = (currentBound._northEast.lat - currentBound._southWest.lat) / i;

            for (let a = 1; a < i + 1; a++) { //rader
                for (let j = 1; j < i + 1; j++) { //kolumner
                    let partBoundContains = false;
                    let currentPartBound = L.latLngBounds(L.latLng(currentBound._northEast.lat - (Vdist * a), currentBound._southWest.lng + (Hdist * (j - 1))), L.latLng(currentBound._northEast.lat - (Vdist * (a - 1)), currentBound._southWest.lng + (Hdist * (j)))); // eslint-disable-line max-len

                    particleModel.currentIntersectingBounds.map(sample => {
                        let bound = utils.convertLatLngBounds(sample.bounds);

                        //test if current bound is included in any intersecting bound
                        if (bound.contains(currentPartBound)) {
                            partBoundContains = true;
                        }
                    });
                    if (partBoundContains === false) {
                        containsCurrentBound = false;
                    }
                }
            }
        }
        m.redraw();
        return containsCurrentBound;
    }


};

export default particleModel;
