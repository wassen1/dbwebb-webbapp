import { products } from "./products.js";
import ordersView from "../views/orders_view.js";

const orders = (() => {
    var baseURL = "https://lager.emilfolino.se/v2";
    var apiKey = "c9cf1b388eaca7e83a076bade6bd0431";
    var allOrders = [];

    function refreshAllOrders() {
        allOrders = [];
    }
    function getOrders(callback) {
        if (allOrders.length > 0) {
            return callback(allOrders);
        }
        fetch(`${baseURL}/orders?api_key=${apiKey}`)
            .then(response => {
                return response.json();
            })
            .then(result => {
                allOrders = result.data;
                if (callback) {
                    callback(allOrders);
                }
            });
    }
    function getOrder(orderId) {
        return allOrders.filter(order => {
            return order.id == orderId;
        })[0];
    }

    function updateOder(order) {
        allOrders = [];
        order.api_key = apiKey;
        order.status_id = 200;

        fetch("https://lager.emilfolino.se/v2/orders", {
            body: JSON.stringify(order),
            headers: {
                "content-type": "application/json"
            },
            method: "PUT"
        }).then(function() {
            order.order_items.map(item => {
                updateProduct({
                    id: item.product_id,
                    name: item.name,
                    stock: item.stock - item.amount
                });
            });
        });
    }

    function updateProduct(item) {
        item.api_key = apiKey;
        fetch("https://lager.emilfolino.se/v2/products", {
            body: JSON.stringify(item),
            headers: {
                "content-type": "application/json"
            },
            method: "PUT"
        }).then(() => {
            products.refreshAllProducts();
            ordersView.drawOdersView();
        });
    }

    function deleteOrder(id) {
        var order = {
            id: id,
            api_key: apiKey
        };

        fetch("https://lager.emilfolino.se/v2/orders", {
            body: JSON.stringify(order),
            headers: {
                "content-type": "application/json"
            },
            method: "DELETE"
        }).then(function() {});
    }

    let publicAPI = {
        getOrder: getOrder,
        getOrders: getOrders,
        updateOder: updateOder,
        clearAllOrders: refreshAllOrders,
        deleteOrder: deleteOrder
    };

    return publicAPI;
})();

export default orders;
