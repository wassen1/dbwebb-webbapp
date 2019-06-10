/* global mainContainer */
import orders from "../src/orders.js";
import { menu } from "../js/menu.js";
import utils from "../js/utils.js";
import orderView from "./order_view.js";
import { products } from "../src/products.js";

let ordersView = (() => {
    function drawOdersView() {
        orders.getOrders(drawElements);
    }
    function drawElements(data) {
        utils.removeNodes("mainContainer");
        mainContainer.appendChild(utils.createElement({
            type: "h1",
            textContent: "Nya ordrar",
            className: "title"
        }));

        data.forEach(order => {
            // console.log('ORDER:', order);
            if (order.status_id === 100) {
                mainContainer.appendChild(utils.createElement({
                    type: "p",
                    innerHTML: `<strong>${order.name}</strong><span class="right">${order.order_items.length}</span>`, //eslint-disable-line max-len
                    onclick: () => orderView.showOrder(order.id),
                }));
            }
        });

        products.getAllProducts();
        menu.showMenu("shopping_cart");
    }

    let publicAPI = {
        drawOdersView: drawOdersView
    };

    return publicAPI;
})();

export default ordersView;
