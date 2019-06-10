
import m from "mithril";

import auth from "./models/auth.js";
import layout from "./views/layout.js";
import deliveries from "./views/deliveries.js";
import form from "./views/form.js";
import invoices from "./views/invoices.js";
import invoicedetails from "./views/invoicedetails.js";
import login from "./views/login.js";
import register from "./views/register.js";
import home from "./views/home.js";
import newInvoice from "./views/newInvoice.js";

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        console.log('device is ready!');
        m.route(document.body, "/", {
            "/": {
                render: () => {
                    return m(layout, { selected: "home" }, m(home));
                }
            },
            "/deliveries": {
                render: () => {
                    return m(layout, { selected: "local_shipping" }, m(deliveries));
                }
            },
            "/new": {
                render: () => {
                    return m(layout, { selected: "local_shipping" }, m(form));
                }
            },

            "/invoices": {
                render: () => {
                    if (auth.token) {
                        return m(layout, { selected: "assignment" }, m(invoices));
                    }
                    return m.route.set("/login");
                }
            },

            "/invoicedetails/:id": {
                render: vnode => {
                    if (auth.token) {
                        return m(
                            layout,
                            { selected: "assignment" },
                            m(invoicedetails, vnode.attrs)
                        );
                    }
                    return m.route.set("/login");
                }
            },

            "/newinvoice": {
                render: () => {
                    if (auth.token) {
                        return m(layout, { selected: "assignment" }, m(newInvoice));
                    }
                    return m.route.set("/login");
                }
            },

            "/login": {
                render: () => {
                    return m(layout, m(login));
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
                    return m(layout, { selected: "person_add" }, m(register));
                }
            }
        });
    }


};

app.initialize();
