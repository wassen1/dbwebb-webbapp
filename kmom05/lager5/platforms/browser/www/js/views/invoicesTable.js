import m from "mithril";
import invoiceModel from "../models/invoiceModel.js";

let invoicesTable = {
    oninit: invoiceModel.getInvoices,
    view: () => {
        return m("table.table.table-scroll.table-striped", [
            m("thead", [
                m("tr", [
                    m("th", "Förfallodatum"),
                    m("th", "Pris"),
                    m("th", "Namn"),
                    m("th", "Fakturadatum")
                ])
            ]),
            m(
                "tbody",
                invoiceModel.invoices.map(invoice => {
                    return m(
                        "tr",
                        {
                            href: "/invoicedetails/" + invoice.id,
                            oncreate: m.route.link
                        },
                        [
                            m("td", invoice.due_date),
                            m("td", invoice.total_price),
                            m("td", invoice.name),
                            m("td", invoice.creation_date)
                        ]
                    );
                })
            )
        ]);
    }
};

export default invoicesTable;
