import m from "mithril";
import orderItemsTable from "./orderItemsTable.js";
import orderTable from "./orderTable.js";

let orderDetails = {
    view: (vnode) => {
        let order = vnode.attrs.order;

        return m("div.wrapper", [
            m(orderTable, { order: order }),
            m(orderItemsTable, { order: order })
        ]);
    }
};

export default orderDetails;
