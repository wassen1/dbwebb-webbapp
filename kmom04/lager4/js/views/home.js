import m from "mithril";
import auth from "../models/auth.js";
import utils from "../models/utils.js";

let now = utils.getNow();

let home = {
    view: () => {
        let timeOfDayGreeting = "Hej";

        if (now.getHours() < 10) {
            timeOfDayGreeting = "God morgon";
        } else if (now.getHours() >= 17) {
            timeOfDayGreeting = "God kväll";
        }

        return m("main.container", [
            m("h1", "Lagerappen 4"),

            auth.token
                ? null
                : m(
                    "h4",
                    `${timeOfDayGreeting} och välkommen till appen för muttrar och skruvar!`
                ),
            m("img", { src: "./img/lagerhall.jpg", alt: "lagerhall" }),


            auth.token
                ? null
                : m(
                    "a.button",
                    { href: "/login", oncreate: m.route.link },
                    "Logga in"
                ),
            auth.token
                ? null
                : m(
                    "a.button.special",
                    {
                        href: "/register",
                        oncreate: m.route.link
                    },
                    "Registrera"
                ),
            auth.token
                ? m(
                    "a.button",
                    { href: "/logout", oncreate: m.route.link },
                    "Logga ut"
                )
                : null
        ]);
    }
};

export default home;
