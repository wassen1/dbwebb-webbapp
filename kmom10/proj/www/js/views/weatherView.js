import m from "mithril";
import utils from "../models/utils.js";
import weatherComponent from "../components/weatherComponent.js";
import position from "../models/position.js";
import weatherModel from "../models/weatherModel.js";
import tableComponent from "../components/tableComponent.js";

let now = utils.getNow();
let hours = now.getHours();

let weatherView = {
    oninit: () => {
        weatherModel.getWeather(position.currentPosition.lat, position.currentPosition.lng);
    },
    view: () => {
        return m("div.wrapper", [
            m("h1", { style: { paddingBottom: "1rem" } }, "Väder"),
            m("p", { style: { paddingBottom: "0.8rem" } }, "för aktuell position"),
            Object.keys(weatherModel.currentWeather).length ? m("div", [
                m("div.weatherinfocontainer", [
                    m("div.weatherinfowrapper", [
                        m("p", `kl. ${(hours + 1) % 24}`),
                        m(weatherComponent,
                            { title: weatherModel.symbolText.get(weatherModel.currentWeather.timeSeries[0].parameters[18].values[0]), lat: position.currentPosition.lat, lng: position.currentPosition.lng, timeSeries: 0 } // eslint-disable-line max-len
                        ),
                    ]),
                    m(tableComponent, { timeSeries: 0 })
                ]),
                m("div.weatherinfocontainer", [
                    m("div.weatherinfowrapper", [
                        m("p", `kl. ${(hours + 2) % 24}`),
                        m(weatherComponent,
                            { title: weatherModel.symbolText.get(weatherModel.currentWeather.timeSeries[1].parameters[18].values[0]), lat: position.currentPosition.lat, lng: position.currentPosition.lng, timeSeries: 1 } // eslint-disable-line max-len
                        ),
                    ]),
                    m(tableComponent, { timeSeries: 1 })

                ]),
                m("div.weatherinfocontainer", [
                    m("div.weatherinfowrapper", [
                        m("p", `kl. ${(hours + 3) % 24}`),
                        m(weatherComponent,
                            { title: weatherModel.symbolText.get(weatherModel.currentWeather.timeSeries[2].parameters[18].values[0]), lat: position.currentPosition.lat, lng: position.currentPosition.lng, timeSeries: 2 } // eslint-disable-line max-len
                        ),
                    ]),
                    m(tableComponent, { timeSeries: 2 })
                ]),
                m("div.weatherinfocontainer", [
                    m("div.weatherinfowrapper", [
                        m("p", `kl. ${(hours + 4) % 24}`),
                        m(weatherComponent,
                            { title: weatherModel.symbolText.get(weatherModel.currentWeather.timeSeries[3].parameters[18].values[0]), lat: position.currentPosition.lat, lng: position.currentPosition.lng, timeSeries: 3 } // eslint-disable-line max-len
                        ),
                    ]),
                    m(tableComponent, { timeSeries: 3 })

                ]),
                m("div.weatherinfocontainer", [
                    m("div.weatherinfowrapper", [
                        m("p", `kl. ${(hours + 5) % 24}`),
                        m(weatherComponent,
                            { title: weatherModel.symbolText.get(weatherModel.currentWeather.timeSeries[4].parameters[18].values[0]), lat: position.currentPosition.lat, lng: position.currentPosition.lng, timeSeries: 4 } // eslint-disable-line max-len
                        ),
                    ]),
                    m(tableComponent, { timeSeries: 4 })

                ]),
            ],
            m("a", { href: "http://opendata.smhi.se/apidocs/metfcst/index.html" },
                " SMHI Open Data API"
            ),
            ) : m("p", "visas endast inom Europa")
        ]);
    }
};

export default weatherView;
