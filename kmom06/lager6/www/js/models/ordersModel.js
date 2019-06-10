import m from "mithril";
import utils from "./utils.js";

let baseURL = utils.getBaseUrl();
let apiKey = utils.getApiKey();

let ordersModel = {
    allOrders: [],
    currentOrders: [],
    currentOrder: {},
    currentAddress: "",
    currentStatus: "",
    statuses: {
        "100": "Ny",
        "200": "Packad",
        "400": "Skickad",
        "600": "Fakturerad",
        "800": "Retur",
        "900": "Återbetald",
    },

    clearOrder: () => {
        ordersModel.currentAddress = "";
        ordersModel.currentOrder = {};
    },
    getOrders: (defaultStatus) => {
        return m
            .request({
                url: `${baseURL}orders?api_key=${apiKey}`,
                method: "GET"
            })
            .then(result => {
                ordersModel.allOrders = result.data;
                ordersModel.filterOrders(defaultStatus);
            });
    },
    getOrder: (id) => {
        ordersModel.clearOrder();
        return m
            .request({
                url: `${baseURL}orders/${id}?api_key=${apiKey}`,
                method: "GET"
            })
            .then(result => {
                ordersModel.currentOrder = result.data;
                ordersModel.currentAddress =
                `${ordersModel.currentOrder.address},
                ${ordersModel.currentOrder.city},
                ${ordersModel.currentOrder.country}`;
            });
    },
    getTotalPrice: () => {
        return ordersModel.currentOrder.order_items
            .map(item => {
                return item.amount * item.price;
            })
            .reduce((acc, cur) => {
                return acc + cur;
            }, 0);
    },
    filterOrders: (status) => {
        ordersModel.currentStatus = ordersModel.statuses[status];
        ordersModel.currentOrders = ordersModel.allOrders.filter((order) => {
            return order.status_id == status;
        });
        m.redraw();
    },
    save: updates => {
        return m.request({
            method: "PUT",
            url: baseURL + "orders",
            data: Object.assign(ordersModel.currentOrder, updates, { api_key: apiKey })
        });
    }
};

export default ordersModel;
