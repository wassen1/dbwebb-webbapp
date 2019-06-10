import m from "mithril";

let orderTable = {
    view: vnode => {
        let order = vnode.attrs.order;

        return m("table.table.table-scroll.table-striped", [
            m("thead", [
                m("tr", [
                    m("th", ""),
                    m("th", ""),
                ])
            ]),
            m(
                "tbody",
                Object.keys(order).map(prop => {
                    if (prop != "order_items") {
                        return m("tr", [
                            m("td.td-left", prop),
                            m("td.td-right", order[prop]),
                        ]);
                    }
                }),
            )
        ]);
    }
};

export default orderTable;
