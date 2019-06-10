/* global menu list*/

"use strict";

var details = (function() {
    var showDetails = function(product) {
        window.mainContainer.innerHTML = "";

        var title = document.createElement("h1");
        let name = "Detaljer";

        title.className = "title";
        title.textContent = name;

        window.mainContainer.appendChild(title);

        // Nav back
        let navElement = document.createElement("a");
        let topnavigation = document.createElement("nav");

        topnavigation.className = "top-nav";

        var icon = document.createElement("i");

        icon.className = "material-icons";
        icon.textContent = "arrow_back_ios";
        navElement.appendChild(icon);

        navElement.addEventListener("click", list.showList);

        topnavigation.appendChild(navElement);
        window.mainContainer.appendChild(topnavigation);
        //
        function isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        function printSubObject(product, key) {
            let specifier = document.createElement("p");
            let text = `<strong>${key}:`;

            specifier.innerHTML = text;
            window.mainContainer.appendChild(specifier);
            let subs = JSON.parse(product[key]);

            Object.keys(subs).forEach(subKey => {
                let el = document.createElement("p");
                let text = `&nbsp;&nbsp;&nbsp;&nbsp;<strong>${subKey}:</strong> &nbsp; ${ //eslint-disable-line newline-after-var, max-len

                    subs[subKey]
                }`;
                el.innerHTML = text;
                window.mainContainer.appendChild(el);
            });
        }

        Object.keys(product).forEach(key => {
            if (isJsonString(product[key]) && typeof product[key] !== 'number') {
                printSubObject(product, key);
            } else {
                let el = document.createElement("p");
                let text = `<strong>${key}:</strong> &nbsp; ${product[key]}`;

                el.innerHTML = text;
                window.mainContainer.appendChild(el);
            }
        });

        window.rootElement.appendChild(window.mainContainer);

        menu.showMenu("details");
    };

    return {
        showDetails: showDetails
    };
})(details);
