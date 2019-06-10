import m from "mithril";

import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
import ordersModel from "../models/ordersModel.js";
import mapComponent from "../components/map.js";
import orderDetails from "../components/orderDetails";



let order = {
    oninit: (vnode) => {
        ordersModel.getOrder(vnode.attrs.id);
    },
    view: () => {
        return m("div.slide-in", [
            m("h1", "Order"),
            ordersModel.currentOrder.name ? [
                m(orderDetails, { order: ordersModel.currentOrder }),
                m(mapComponent, { label: `Orderns position` })
            ] : "",
            m("div", { style: { height: "40px" } }, "")
        ]);
    }
};

export default order;
