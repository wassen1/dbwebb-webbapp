import m from "mithril";
import orderItemsTable from "./orderItemsTable.js";

let orderDetailsInvoice = {
    view: (vnode) => {
        let order = vnode.attrs.order;

        return [
            m("p", order.name),
            m("p", order.address),
            m("p", order.zip + " " + order.city),
            m("p", order.country),
            m("p", "Orderrader:"),
            // m(orderTable, { order: order }),
            m(orderItemsTable, { order: order })
        ];
    }
};

export default orderDetailsInvoice;
