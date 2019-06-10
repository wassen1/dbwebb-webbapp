import m from "mithril";
import auth from "../models/auth.js";

let menu = {
    view: vnode => {
        let navElements = [
            {
                name: "Start",
                class: "home",
                nav: function () {
                    m.route.set("/");
                }
            },
            {
                name: "Karta",
                class: "assignment",
                nav: function () {
                    m.route.set("/map");
                }
            },
            ...(auth.token
                ? [
                    {
                        name: "Väder",
                        class: "wb_cloudy",
                        nav: function () {
                            m.route.set("/weather");
                        }
                    },
                ]
                : [])
        ];

        return navElements.map(element => {
            return m(
                "a",
                {
                    class:
                        vnode.attrs.selected === element.class ? "active" : "",
                    onclick: element.nav
                },
                [
                    m(
                        "i",
                        {
                            class: "material-icons"
                        },
                        element.class
                    ),
                    m("span", { class: "icon-text" }, element.name)
                ]
            );
        });
    }
};

export default menu;
