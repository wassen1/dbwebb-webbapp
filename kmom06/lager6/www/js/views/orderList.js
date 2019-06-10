import m from "mithril";
import ordersModel from "../models/ordersModel.js";

let select = {
    selectStatus: false,
    defaultStatus: "200",
    getDefaultOptions: () => {
        let options = [];

        for (status in ordersModel.statuses) { // eslint-disable-line no-global-assign
            if (status == select.defaultStatus) {
                options.push(
                    m("option", { value: status, selected: "selected" },
                        ordersModel.statuses[status])
                );
            } else {
                options.push(m("option", { value: status }, ordersModel.statuses[status]));
            }
        }
        return options;
    },
    getOptions: () => {
        let options = [];

        for (status in ordersModel.statuses) {  // eslint-disable-line no-global-assign
            options.push(m("option", { value: status }, ordersModel.statuses[status]));
        }
        return options;
    },
    view: () => {
        return m("select[required].input#select", {
            onchange: (event) => {
                select.selectStatus = true;
                ordersModel.filterOrders(event.target.value);
            }
        }, select.selectStatus ? select.getOptions() : select.getDefaultOptions());
    }
};

let listWithOrders = {
    view: () => {
        return m("div.deliveries", ordersModel.currentOrders.map((order) => {
            return m("div", [
                m("p", [
                    m("a", { href: "/orders/" + order.id, oncreate: m.route.link }, order.name)
                ])
            ]);
        }));
    }
};

let noOrders = {
    view: () => {
        return m("p", "Inga ordrar med status " + ordersModel.currentStatus);
    }
};
let orderList = {
    oninit: () => {
        ordersModel.getOrders(select.defaultStatus);
    },
    view: () => {
        return [
            m("h1", "Ordrar"),
            m("label.input-label", "Ordrar"),
            m(select),
            ordersModel.currentOrders.length ? m(listWithOrders) : m(noOrders),
        ];
    }
};

export default orderList;
