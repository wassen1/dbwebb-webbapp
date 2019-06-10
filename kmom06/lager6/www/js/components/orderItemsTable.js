import m from "mithril";
import ordersModel from "../models/ordersModel.js";

let orderItemsTable = {
    view: vnode => {
        let order = vnode.attrs.order;

        return m("table.table.table-scroll.table-striped", [
            m("thead", [
                m("tr", [
                    m("th", "Produkt"),
                    m("th", "Antal"),
                    m("th", "Pris"),
                    m("th", "Total")
                ])
            ]),
            m(
                "tbody",
                order.order_items
                    .map(product => {
                        return m("tr", [
                            m("td.td-left", product.name),
                            m("td", product.amount),
                            m("td", product.price),
                            m("td", product.price * product.amount)
                        ]);
                    })
                    .concat([
                        m("td", ""),
                        m("td", ""),
                        m("td", ""),
                        m("td", ordersModel.getTotalPrice())
                    ])
            )
        ]);
    }
};

export default orderItemsTable;
