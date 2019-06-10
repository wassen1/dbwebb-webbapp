/* global home, list */

"use strict";

var menu = (function() {
    var showMenu = function(selected) {
        window.navigation.innerHTML = "";

        var navElements = [
            { name: "Start", class: "home", nav: home.showHome },
            { name: "Produkter", class: "list", nav: list.showList },
            { name: "Detaljer", class: "details", nav: list.showList },

        ];

        navElements.forEach(element => {
            let navElement = document.createElement("a");

            if (selected === element.class) {
                navElement.className = "active";
            }

            navElement.addEventListener("click", element.nav);

            var icon = document.createElement("i");

            icon.className = "material-icons";
            icon.textContent = element.class;
            navElement.appendChild(icon);

            var text = document.createElement("span");

            text.className = "icon-text";
            text.textContent = element.name;
            navElement.appendChild(text);

            // navElement.textContent = element;
            window.navigation.appendChild(navElement);
        });
        window.rootElement.appendChild(window.navigation);
    };

    return {
        showMenu: showMenu
    };
})(menu);
