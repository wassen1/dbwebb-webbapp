import m from "mithril";
import auth from "./auth.js";
import ordersModel from "./ordersModel.js";
import utils from "./utils.js";

let baseURL = utils.getBaseUrl();
let apiKey = utils.getApiKey();
let now = utils.getNow();
let dueDate = new Date();

dueDate.setDate(dueDate.getDate() + 30);

let invoiceModel = {
    invoices: [],

    getInvoices: () => {
        return m
            .request({
                method: "GET",
                url: `${baseURL}invoices?api_key=${apiKey}`,
                headers: {
                    "x-access-token": auth.token
                }
            })
            .then(result => {
                invoiceModel.invoices = result.data;
            });
    },
    getInvoice: id => {
        return invoiceModel.invoices.filter(invoice => {
            return invoice.id == id;
        })[0];
    },

    // currentInvoice: {},
    save: () => {
        let totalPrice = ordersModel.getTotalPrice();

        return m
            .request({
                method: "POST",
                url: `${baseURL}invoices`,
                headers: {
                    "x-access-token": auth.token
                },
                data: {
                    api_key: apiKey,
                    order_id: ordersModel.currentOrder.id,
                    total_price: totalPrice,
                    creation_date: now.toLocaleDateString("sv-SE"),
                    due_date: dueDate.toLocaleDateString("sv-SE")
                }
            })
            .then(() => {
                m.route.set("/invoices");
            });
    }
};

export default invoiceModel;
