import m from "mithril";
import deliveries from "../js/models/deliveries.js";

var list = {
    oninit: deliveries.getDeliveries,
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
                deliveries.currentDeliveries.length
                    ? deliveries.currentDeliveries.map((delivery) => {
                        return m("div", [
                            m(
                                "p",
                                `${delivery.product_name} - ${delivery.amount}`
                            )
                        ]);
                    })
                    : m("div", "No deliveries available")
            )
        ]);
    }
};

export default list;
