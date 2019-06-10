import m from "mithril";
import list from "../views/list.js";
import form from "../views/form.js";

m.route(document.body, "/", {
    "/": list,
    "/new": form
});
