/* global mainContainer */
import orders from "../src/orders.js";
import { menu } from "../js/menu.js";
import utils from "../js/utils.js";
import ordersView from "./orders_view.js";
import { products } from "../src/products.js";

let orderView = (() => {
    function showOrder(orderId) {
        let order = orders.getOrder(orderId);

        utils.removeNodes("mainContainer");
        mainContainer.appendChild(
            utils.createElement({
                type: "h1",
                textContent: "Order",
                className: "title"
            })
        );
        mainContainer
            .appendChild(
                utils.createElement({
                    type: "nav",
                    className: "top-nav"
                })
            )
            .appendChild(
                utils.createElement({
                    type: "a",
                    onclick: ordersView.drawOdersView
                })
            )
            .appendChild(
                utils.createElement({
                    type: "i",
                    className: "material-icons",
                    textContent: "arrow_back_ios"
                })
            );

        mainContainer.appendChild(
            utils.createElement({
                type: "h2",
                textContent: order.name
            })
        );
        order.order_items.forEach(item => {
            mainContainer.appendChild(
                utils.createElement({
                    type: "div",
                    className: "line"
                })
            );
            mainContainer.appendChild(
                utils.createElement({
                    type: "p",
                    textContent: item.name
                })
            );
            mainContainer.appendChild(
                utils.createElement({
                    type: "p",
                    innerHTML: `Artickelnr: <span class="right">${
                        item.article_number
                    }</span>`
                })
            );
            mainContainer.appendChild(
                utils.createElement({
                    type: "p",
                    innerHTML: `Lagerplats: <span class="right">${
                        item.location
                    }</span>`
                })
            );
            mainContainer.appendChild(
                utils.createElement({
                    type: "p",
                    innerHTML: `Antal: <span class="right">${
                        item.amount
                    }</span>`
                })
            );
        });
        mainContainer.appendChild(
            utils.createElement({
                type: "div",
                className: "line"
            })
        );

        function checkStock() {
            let status = true;

            order.order_items.forEach(orderItem => {
                if ((products.getProduct(orderItem.product_id).stock - orderItem.amount) < 0) {
                    status = false;
                }
            });
            return status;
        }
        if (checkStock()) {
            mainContainer.appendChild(
                utils.createElement({
                    type: "button",
                    className: "button full-width-button",
                    textContent: "Sätt som packat",
                    onclick: () => {
                        orders.updateOder(order);
                    }
                })
            );
        } else {
            mainContainer.appendChild(utils.createElement({
                type: "button",
                className: "button full-width-button",
                textContent: "Finns ej i lager",
                disabled: "disabled"
            }));
        }

        menu.showMenu("shopping_cart");
    }

    let publicAPI = {
        showOrder: showOrder
    };

    return publicAPI;
})();

export default orderView;
