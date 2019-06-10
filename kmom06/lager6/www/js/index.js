/* global device */
import m from "mithril";

import auth from "./models/auth.js";
import layout from "./components/layout.js";
import deliveries from "./views/deliveries.js";
import form from "./components/form.js";
import invoices from "./views/invoices.js";
import invoicedetails from "./views/invoicedetails.js";
import login from "./views/login.js";
import register from "./views/register.js";
import home from "./views/home.js";
import newInvoice from "./views/newInvoice.js";
import orderList from "./views/orderList.js";
import order from "./views/order.js";

var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        if (device.platform.toLowerCase() == "android") {
            document.getElementById("app-style").setAttribute("href", "css/style-android.min.css");
        }
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
                    return m(
                        layout, { selected: "local_shipping", back: true, href: "/deliveries" },
                        m(form)
                    );
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
                            { selected: "assignment", back: true, href: "/invoices" },
                            m(invoicedetails, vnode.attrs)
                        );
                    }
                    return m.route.set("/login");
                }
            },

            "/newinvoice": {
                render: () => {
                    if (auth.token) {
                        return m(
                            layout, { selected: "assignment", back: true, href: "/invoices" },
                            m(newInvoice)
                        );
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
            "/orders": {
                render: () => {
                    if (auth.token) {
                        return m(
                            layout, { selected: "shopping_basket" },
                            m(orderList)
                        );
                    }
                    return m.route.set("/login");
                }
            },
            "/orders/:id": {
                render: vnode => {
                    if (auth.token) {
                        return m(
                            layout,
                            { selected: "shopping_basket", back: true, href: "/orders" },
                            m(order, vnode.attrs)
                        );
                    }

                    return m.route.set("/login");
                }
            },
        });
    }
};

app.initialize();
