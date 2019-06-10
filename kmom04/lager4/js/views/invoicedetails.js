import m from "mithril";
import invoiceModel from "../models/invoiceModel.js";

let invoice = {
    oninit: invoiceModel.getInvoices,
    view: vnode => {
        let invoice = invoiceModel.getInvoice(vnode.attrs.id);

        return m("main.container", [
            m("h1", "Fakturadetaljer"),

            m("table.table.table-scroll.table-striped", [
                m("thead", [m("tr", [m("th", "Nyckel"), m("th", "Värde")])]),
                m(
                    "tbody",
                    Object.keys(invoice).map(key => {
                        return m("tr", [m("td", key), m("td", invoice[key])]);
                    })
                )
            ])
        ]);
    }
};

export default invoice;
