import m from "mithril";
import weatherModel from "../models/weatherModel.js";

let tableComponent = {
    view: vnode => {
        let timeSeries = vnode.attrs.timeSeries;

        return m("table.table.table-scroll.table-striped", [
            m("thead", [
                m("tr", [
                    m("th", "Temperatur"),
                    m("th", "Nederbörd"),
                    m("th", "Lufttryck"),
                    m("th", "Vindriktning")
                ])
            ]),
            m(
                "tbody",
                m("tr", [
                    m("td.td-left", weatherModel.currentWeather.timeSeries[timeSeries].parameters[11].values[0] + " ℃"),    // eslint-disable-line max-len
                    m("td", weatherModel.currentWeather.timeSeries[timeSeries].parameters[3].values[0] + " mm/h"),  // eslint-disable-line max-len
                    m("td", weatherModel.currentWeather.timeSeries[timeSeries].parameters[10].values[0] + " hPa"),  // eslint-disable-line max-len
                    m("td", weatherModel.currentWeather.timeSeries[timeSeries].parameters[13].values[0] + "°")  // eslint-disable-line max-len
                ])


            )
        ]);
    }
};

export default tableComponent;
