/* global */

"use strict";

import { home } from "../views/home_view.js";
import utils from "./utils.js";
// import toDelete from "./toDelete.js";

(function() {
    // toDelete.products();
    // toDelete.orders();
    utils.removeNodes("root");
    root.appendChild(utils.createElement({
        type: "main",
        className: "container",
        id: "mainContainer"
    }));

    root.appendChild(utils.createElement({
        type: "nav",
        className: "bottom-nav",
        id: "navigation"
    }));

    home.showHome();
})();
