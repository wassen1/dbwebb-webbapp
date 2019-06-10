import m from "mithril";
import utils from "./utils.js";

let baseURL = utils.getBaseUrl();
let apiKey = utils.getApiKey();

let ordersModel = {
    currentOrders: [],

    getOrders: () => {
        return m
            .request({
                url: `${baseURL}orders?api_key=${apiKey}`,
                method: "GET"
            })
            .then(result => {
                ordersModel.currentOrders = result.data;
            });
    },
    getOrder: id => {
        return ordersModel.currentOrders.filter(order => {
            return order.id == id;
        })[0];
    },
    currentOrder: {},
    getTotalPrice: () => {
        return ordersModel.currentOrder.order_items
            .map(item => {
                return item.amount * item.price;
            })
            .reduce((acc, cur) => {
                return acc + cur;
            }, 0);
    },
    save: updates => {
        return m.request({
            method: "PUT",
            url: baseURL + "orders",
            data: {
                ...ordersModel.currentOrder,
                api_key: apiKey,
                ...updates
            }
        });
    }
};

export default ordersModel;
