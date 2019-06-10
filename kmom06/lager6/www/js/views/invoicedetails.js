import m from "mithril";
import invoiceModel from "../models/invoiceModel.js";
import utils from "../models/utils.js";

let invoice = {
    oninit: invoiceModel.getInvoices,
    onbeforeremove: utils.slideH,
    view: vnode => {
        let invoice = invoiceModel.getInvoice(vnode.attrs.id);

        return m("div.slide-in.wrapper", [
            m("h1", "Fakturadetaljer"),

            m("table.table.table-scroll.table-striped", [
                m("thead", [
                    m("tr", [
                        m("th", ""),
                        m("th", "")
                    ])
                ]),
                m(
                    "tbody",
                    Object.keys(invoice).map(key => {
                        return m("tr", [m("td.td-left", key), m("td", invoice[key])]);
                    })
                )
            ])
        ]);
    }
};

export default invoice;
