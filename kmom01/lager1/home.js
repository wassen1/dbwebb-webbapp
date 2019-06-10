/* global menu list*/
"use strict";

var home = (() => {
    var showHome = function() {
        window.mainContainer.innerHTML = "";

        var title = document.createElement("h1");

        title.className = "title";
        title.textContent = `Lagerappen`;

        var greeting = document.createElement("p");
        var timeOfDayGreeting = "Hej";
        var now = new Date();

        if (now.getHours() < 10) {
            timeOfDayGreeting = "God morgon";
        } else if (now.getHours() >= 17) {
            timeOfDayGreeting = "God kväll";
        }

        greeting.textContent = `${timeOfDayGreeting} och välkommen till appen för muttrar och skruvar!`; //eslint-disable-line max-len

        let image = document.createElement("img");

        image.src = "lagerhall.jpg";
        image.alt = "lagerhall";
        image.addEventListener('click', list.showList);

        window.mainContainer.appendChild(title);
        window.mainContainer.appendChild(greeting);
        window.mainContainer.appendChild(image);

        window.rootElement.appendChild(window.mainContainer);

        menu.showMenu("home");
    };

    return {
        showHome: showHome
    };
})(home);
