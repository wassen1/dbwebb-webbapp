/* global mainContainer*/

"use strict";
import { menu } from "../js/menu.js";
import { details } from "./product_view.js";
import { products } from "../src/products.js";
import utils from "../js/utils.js";

var list = {
    show: () => {
        products.getAllProducts(list.showList);
    },
    showList: (data) => {
        utils.removeNodes("mainContainer");
        mainContainer.appendChild(utils.createElement({
            type: "h1",
            textContent: "Lagersaldo",
            className: "title"
        }));

        mainContainer.appendChild(utils.createElement({
            type: "h2",
            textContent: `Antal produkter: ${products.allProducts.length}`
        }));

        data.forEach(product => {
            // console.log('PRODUCT: ', product)
            mainContainer.appendChild(utils.createElement({
                type: "p",
                innerHTML: `<strong>${product.name}</strong><span class="right">${product.stock}</span>`, //eslint-disable-line max-len
                onclick: () => details.showDetails(product.id),
            }));
        });

        menu.showMenu("list");
    }

};

export { list };
