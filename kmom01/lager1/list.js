/* global menu, details */

"use strict";

var list = (function() {
    var showList = () => { //eslint-disable-line newline-after-var
        window.mainContainer.innerHTML = "";

        var title = document.createElement("h1");
        let name = "Produkter";

        title.className = "title";
        title.textContent = name;

        fetch(
            "https://lager.emilfolino.se/v2/products?api_key=c9cf1b388eaca7e83a076bade6bd0431"
            // "https://dbwebb-lager.steen.ninja/products"
        )
            .then(response => response.json())
            .then(result => {
                let numberOfResults = document.createElement("h2");

                numberOfResults.textContent = `Antal produkter: ${
                    result.data.length
                }`;
                window.mainContainer.appendChild(numberOfResults);

                result.data.forEach(product => {
                    let productElement = document.createElement("p");

                    productElement.textContent = product.name;
                    productElement.addEventListener("click", () => {
                        details.showDetails(product);
                    });
                    window.mainContainer.appendChild(productElement);
                });
            });
        window.mainContainer.appendChild(title);

        window.rootElement.appendChild(window.mainContainer);

        menu.showMenu("list");
    };
    return {
        showList: showList
    };
})(list);
