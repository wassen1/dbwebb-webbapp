import m from "mithril";
import weatherModel from "../models/weatherModel.js";

let weatherMap = new Map([
    [1, "./img/SMHI_symbols/1.png"],
    [2, "./img/SMHI_symbols/2.png"],
    [3, "./img/SMHI_symbols/3.png"],
    [4, "./img/SMHI_symbols/4.png"],
    [5, "./img/SMHI_symbols/5.png"],
    [6, "./img/SMHI_symbols/6.png"],
    [7, "./img/SMHI_symbols/7.png"],
    [8, "./img/SMHI_symbols/8.png"],
    [9, "./img/SMHI_symbols/9.png"],
    [10, "./img/SMHI_symbols/10.png"],
    [11, "./img/SMHI_symbols/11.png"],
    [12, "./img/SMHI_symbols/12.png"],
    [13, "./img/SMHI_symbols/13.png"],
    [14, "./img/SMHI_symbols/14.png"],
    [15, "./img/SMHI_symbols/15.png"],
    [16, "./img/SMHI_symbols/16.png"],
    [17, "./img/SMHI_symbols/17.png"],
    [18, "./img/SMHI_symbols/18.png"],
    [19, "./img/SMHI_symbols/19.png"],
    [20, "./img/SMHI_symbols/20.png"],
    [21, "./img/SMHI_symbols/21.png"],
    [22, "./img/SMHI_symbols/22.png"],
    [23, "./img/SMHI_symbols/23.png"],
    [24, "./img/SMHI_symbols/24.png"],
    [25, "./img/SMHI_symbols/25.png"],
    [26, "./img/SMHI_symbols/26.png"],
    [27, "./img/SMHI_symbols/27.png"],
]);

const weatherComponent = {

    view: (vnode) => {
        return [
            m("div.weather", [
                Object.keys(weatherModel.currentWeather).length
                    ? m("img", { src: weatherMap.get(weatherModel.currentWeather.timeSeries[vnode.attrs.timeSeries].parameters[18].values[0]), title: vnode.attrs.title, alt: "wether symbol", style: { height: "2rem", padding: 0 } }) // eslint-disable-line max-len
                    : m("div", { style: { height: "2.2rem" } }, "")
            ])
        ];
    }
};

export default weatherComponent;
