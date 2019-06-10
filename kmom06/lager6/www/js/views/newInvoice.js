import m from "mithril";
import invoiceModel from "../models/invoiceModel.js";
import ordersModel from "../models/ordersModel.js";
import utils from "../models/utils.js";
import orderDetailsInvoice from "../components/orderDetailsInvoice.js";

let select = {
    getOptions: () => {
        return [{ name: "Välj...", id: "" }]
            .concat(ordersModel.allOrders)
            .filter(item => {
                return item.status_id != 600;
            })
            .map(item => {
                return m(
                    "option",
                    { value: item.id },
                    item.name
                );
            });
    },

    getOrderDetails: (e) => {
        return e.target.value != "" ? ordersModel.getOrder(
            e.target.value
        ).then(() => {
            m.render(
                document.getElementById("order-info"),
                m(orderDetailsInvoice, { order: ordersModel.currentOrder })
            );
        }) : m.render(
            document.getElementById("order-info"), "ingen vald order");
    }
};

let newInvoice = {
    oninit: ordersModel.getOrders,
    onbeforeremove: utils.slideH,
    view: () => {
        return m("div.slide-in", [
            m("h1", "Ny faktura"),
            m(
                "form.form.wrapper",
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
                                select.getOrderDetails(e);
                            }
                        },
                        select.getOptions()
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
