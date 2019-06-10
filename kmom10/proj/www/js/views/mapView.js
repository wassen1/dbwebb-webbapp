import m from "mithril";
import mapComponent from "../components/mapComponent.js";
import particleModel from "../models/particleModel.js";
import weatherModel from "../models/weatherModel.js";


function updateMap(event, newZoomLevel = mapComponent.currentZooLevel) {
    let rangeArray = [];

    mapComponent.currentZooLevel = newZoomLevel;

    //get the range
    selectMap.forEach((val, key) => {
        if (val[1] != 0 && val[1] <= newZoomLevel) {
            rangeArray.push(key);
        }
    });
    if (rangeArray.length) {
        if (particleModel.currentRange != rangeArray[0] || mapComponent.lastCenter.lat !== mapComponent.currentCenter.lat || mapComponent.lastCenter.lng !== mapComponent.currentCenter.lng) { // eslint-disable-line max-len
            particleModel.currentRange = rangeArray[0];
            particleModel.getCurrentParticles(mapComponent.currentCenter.lat, mapComponent.currentCenter.lng); // eslint-disable-line max-len
            if (mapComponent.lastCenter.lat !== mapComponent.currentCenter.lat || mapComponent.lastCenter.lng !== mapComponent.currentCenter.lng) { // eslint-disable-line max-len
                weatherModel.getWeather(mapComponent.currentCenter.lat, mapComponent.currentCenter.lng); // eslint-disable-line max-len
            }
        }
    }
    mapComponent.lastCenter = mapComponent.currentCenter;
}

function eventCallback(event) {
    switch (event.type) {
        case 'moveend':
            updateMap(event, event.target._zoom);
            break;
        case 'zoomend':
            updateMap(event, event.target._zoom);
            break;
        default:
            console.log('no valid event!');
    }
}

let selectMap = new Map([
    ["", ["Välj radie", 0]],
    ["1", ["1km", 14]],
    ["5", ["5km", 12]],
    ["10", ["10km", 11]],
    ["15", ["15km", 10]],
    ["40", ["40km", 9]],
    ["75", ["75km", 8]],
    ["150", ["150km", 7]],
    ["300", ["300km", 6]],
    ["600", ["600km", 5]],
    ["1000", ["1000km", 4]],
    ["2000", ["2000km", 3]],
    ["5000", ["5000km", 2]],
    ["10000", ["10000km", 1]],

]);

let mapView = {
    oninit: () => {
        weatherModel.getWeather(mapComponent.currentCenter.lat, mapComponent.currentCenter.lng);
    },

    view: () => {
        return m("div.wrapper",
            [   /* eslint-disable max-len */
                m(mapComponent, { label: "Partikelkarta", callback: eventCallback }),
                mapComponent.currentCenter.lat ? m("p", `Kartans centrum är på position:`) : m("div", ""),
                mapComponent.currentCenter.lat ? m("p", `lat ${mapComponent.currentCenter.lat}, long ${mapComponent.currentCenter.lng}.`) : m("div", { style: { height: "1rem", width: "100%" } }, ""),
                m("div", { style: { height: "1rem", width: "100%" } }, ""),
                mapComponent.currentCenter.lat ? m("p", `Partikelcensorer inom ${particleModel.currentRange}km radie visas.`) : m("div", ""),
                m("div", { style: { height: "1rem", width: "100%" } }, ""),
                m("h4", "Om partiklarna"),
                m("p", `Ett vanligt mått på partiklar är PM10, som förenklat är massan av partiklar i luften som är mindre än tio mikrometer (µm) i diameter.
                        Partiklar som är mindre än tio mikrometer i diameter (PM10) kan när de andas in nå ner i lungorna och orsaka lungsjukdomar.
                        Ett annat partikelmått som mäts är PM2,5 som är partiklar som är mindre än 2,5 mikrometer (μm). Dessa något mindre partiklar har en tydlig koppling till effekter på hälsan både på kort och lång sikt.`) /* eslint-enable max-len */



            ]
        );
    }
};

export default mapView;
