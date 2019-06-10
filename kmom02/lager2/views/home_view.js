/* global mainContainer*/
"use strict";
import { menu } from "../js/menu.js";
import { list } from "./products_view.js";
import utils from "../js/utils.js";


var home = {
    titleText: "Lagerappen",
    showHome: function() {
        var timeOfDayGreeting = "Hej";
        var now = new Date();

        if (now.getHours() < 10) {
            timeOfDayGreeting = "God morgon";
        } else if (now.getHours() >= 17) {
            timeOfDayGreeting = "God kväll";
        }

        utils.removeNodes("mainContainer");

        mainContainer.appendChild(utils.createElement({
            type: "h1",
            textContent: home.titleText,
            className: "title"
        }));

        mainContainer.appendChild(utils.createElement({
            type: "p",
            textContent: `${timeOfDayGreeting} och välkommen till appen för muttrar och skruvar!`, //eslint-disable-line max-len
        }));

        mainContainer.appendChild(utils.createElement({
            type: "img",
            src: "lagerhall.jpg",
            alt: "lagerhall",
            onclick: list.show
        }));

        menu.showMenu("home");
    }

};

export { home };
