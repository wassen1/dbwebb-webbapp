import m from "mithril";
import invoiceModel from "../models/invoiceModel.js";
import invoicesTable from "./invoicesTable.js";

let noInvoices = {
    view: () => {
        return m("h4", "Det finns inga fakturor.");
    }
};

let invoices = {
    oninit: invoiceModel.getInvoices,
    view: () => {
        return m("main.container", [
            m("h1", "Fakturor"),
            invoiceModel.invoices.length > 0 ? m(invoicesTable) : m(noInvoices),
            m(
                "a.button",
                {
                    href: "/newinvoice",
                    oncreate: m.route.link,
                    value: "make invoice"
                },
                "Skapa faktura"
            )
        ]);
    }
};

export default invoices;
