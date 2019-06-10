import m from "mithril";
import deliveriesModel from "../models/deliveriesModel.js";

let deliveries = {
    oninit: deliveriesModel.getDeliveries,
    view: () => {
        return m("main.container", [
            m("h1", "Inleveranser"),
            m(
                "a.button",
                { href: "/new", oncreate: m.route.link },
                "Ny inleverans"
            ),
            m(
                "div.deliveries",
                deliveriesModel.currentDeliveries.length
                    ? deliveriesModel.currentDeliveries.map(delivery => {
                        return m("div", [
                            m(
                                "p",
                                `${delivery.product_name} - ${
                                delivery.amount         //eslint-disable-line indent
                                }`
                            )
                        ]);
                    })
                    : m("div", "No deliveries available")
            )
        ]);
    }
};

export default deliveries;
