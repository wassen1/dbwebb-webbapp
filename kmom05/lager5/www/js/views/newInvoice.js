import m from "mithril";
import invoiceModel from "../models/invoiceModel.js";
import ordersModel from "../models/ordersModel.js";
import orderTable from "./orderTable.js";

let newInvoice = {
    oninit: ordersModel.getOrders,

    view: () => {
        return m("main.container", [
            m("h1", "Ny faktura"),
            m(
                "form",
                {
                    onsubmit: event => {
                        event.preventDefault();
                        invoiceModel.save();
                        ordersModel.save({ status_id: 600 });
                    }
                },
                [
                    m("label.input-label", "Order"),
                    m(
                        "select[required].input",
                        {
                            onchange: e => {
                                let order = ordersModel.getOrder(
                                    e.target.value
                                );

                                ordersModel.currentOrder = order;

                                m.render(
                                    document.getElementById("order-info"),
                                    [
                                        m("p", order.name),
                                        m("p", order.address),
                                        m("p", order.zip + " " + order.city),
                                        m("p", order.country),
                                        m("p", "Orderrader:"),
                                        m(orderTable, { order: order })
                                    ]
                                );
                            }
                        },

                        [{ name: "Välj..." }]
                            .concat(ordersModel.currentOrders)
                            .filter(item => {
                                return item.status_id != 600;
                            })
                            .map(item => {
                                return m(
                                    "option",
                                    { value: item.id },
                                    item.name
                                );
                            })
                    ),
                    m("p#order-info", ""),

                    m(
                        "input[type=submit][value=Skapa faktura].button",
                        "Skapa faktura"
                    )
                ]
            )
        ]);
    }
};

export default newInvoice;
