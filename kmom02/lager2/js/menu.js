/* global navigation*/

"use strict";
import { home } from "../views/home_view.js";
import { list } from "../views/products_view.js";
import utils from "./utils.js";
import ordersView from "../views/orders_view.js";

var menu = {

    showMenu: function(selected) {
        utils.removeNodes("navigation");

        var navElements = [
            { name: "Start", class: "home", nav: home.showHome },
            { name: "Lagersaldo", class: "list", nav: list.show },
            { name: "Plocklista", class: "shopping_cart", nav: ordersView.drawOdersView },
        ];

        navElements.forEach(element => {
            let navElement = utils.createElement({
                type: "a",
                className: (selected === element.class) ? "active" : "",
                onclick: element.nav
            });

            navElement.appendChild(
                utils.createElement({
                    type: "i",
                    className: "material-icons",
                    textContent: element.class
                })
            );

            navElement.appendChild(
                utils.createElement({
                    type: "span",
                    className: "icon-text",
                    textContent: element.name
                })
            );

            navigation.appendChild(navElement);
        });

        root.appendChild(navigation);
    }
};

export { menu };
