/* global mainContainer*/

"use strict";
import { products } from "../src/products.js";
import utils from "../js/utils.js";
import { menu } from "../js/menu.js";
import { list } from "./products_view.js";

var details = {
    showDetails: function(productId) {
        let product = products.getProduct(productId);

        function isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        function printSubObject(product, key) {
            let text = `<strong>${key}:`;

            mainContainer.appendChild(
                utils.createElement({
                    type: "p",
                    innerHTML: text
                })
            );

            let subs = JSON.parse(product[key]);

            Object.keys(subs).forEach(subKey => {
                let text = `&nbsp;&nbsp;&nbsp;&nbsp;<strong>${subKey}:</strong> &nbsp; ${subs[subKey]}`; //eslint-disable-line newline-after-var, max-len

                mainContainer.appendChild(
                    utils.createElement({
                        type: "p",
                        innerHTML: text
                    })
                );
            });
        }

        utils.removeNodes("mainContainer");

        mainContainer.appendChild(
            utils.createElement({
                type: "h1",
                textContent: "Detaljer",
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
                    onclick: list.show
                })
            )
            .appendChild(
                utils.createElement({
                    type: "i",
                    className: "material-icons",
                    textContent: "arrow_back_ios"
                })
            );


        Object.keys(product).forEach(key => {
            if (
                isJsonString(product[key]) &&
                typeof product[key] !== "number" &&
                product[key] != null
            ) {
                printSubObject(product, key);
            } else {
                let text = `<strong>${key}:</strong> &nbsp; ${product[key]}`;

                mainContainer.appendChild(
                    utils.createElement({
                        type: "p",
                        innerHTML: text
                    })
                );
            }
        });

        menu.showMenu("list");
    }
};

export { details };
