import m from "mithril";

import home from "./views/home.js";
import layout from "./components/layout.js";
import mapView from "./views/mapView.js";
import register from "./views/register.js";
import login from "./views/login.js";
import auth from "./models/auth.js";
import weatherView from "./views/weatherView.js";


var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        m.route(document.body, "/", {
            "/": {
                render: () => {
                    return m(layout, { selected: "home" }, m(home));
                }
            },
            "/map": {
                render: () => {
                    return m(layout, { selected: "assignment" }, m(mapView));
                }
            },
            "/weather": {
                render: () => {
                    if (auth.token) {
                        return m(layout, { selected: "wb_cloudy" }, m(weatherView));
                    }
                    return m.route.set("/login");
                }
            },
            "/login": {
                render: () => {
                    return m(layout, { back: true, href: "/" }, m(login));
                }
            },

            "/logout": {
                render: () => {
                    auth.logout();
                    return m(layout, { selected: "home" }, m(home));
                }
            },

            "/register": {
                render: () => {
                    return m(layout, { back: true, href: "/" }, m(register));
                }
            },
        });
    }
};

app.initialize();
