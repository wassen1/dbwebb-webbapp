import m from "mithril";
import utils from "../models/utils.js";
import auth from "../models/auth.js";
import weatherModel from "../models/weatherModel.js";
import position from "../models/position.js";

let now = utils.getNow();

let home = {
    oncreate: () => {
        position.getCurrentPosition(weatherModel.getWeather);
    },

    view: () => {
        let timeOfDayGreeting = "Hej";

        if (now.getHours() < 10) {
            timeOfDayGreeting = "God morgon";
        } else if (now.getHours() >= 17) {
            timeOfDayGreeting = "God kväll";
        }

        return m("div.wrapper", [
            m("h1", "Particle Finder"),

            auth.token
                ? null
                : m(
                    "h4",
                    `${timeOfDayGreeting} och välkommen till appen som visar luftdata!`
                ),

            m("p", "Att andas in partiklar kan ge olika hälsoeffekter, beroende på vilka kemiska och fysikaliska egenskaper som partiklarna har."), // eslint-disable-line max-len
            m("p", "Partiklar från slitage av dubbdäck har negativa hälsoeffekter på kort sikt när det gäller hjärt- och lungsjukdomar, samtidigt leder de till ökade besvär för exempelvis astmatiker."), // eslint-disable-line max-len
            m("p", "Även exponering av trafikföroreningar under lång tid påverkar hälsan. Exempelvis på effekter är förtida död i hjärt- kärlsjukdomar och försämrad lungutveckling hos barn."), // eslint-disable-line max-len
            m("a", { href: "http://www.naturvardsverket.se/Sa-mar-miljon/Klimat-och-luft/Luftfororeningar/Partiklar/" }, "Källa: Naturvårdsverket"), // eslint-disable-line max-len
            m("div", { style: { height: "2rem", width: "100 %" } }),
            m("p", { style: { display: "inline-block" } }, "Appens partikeldata kommer från "),
            m("a", { href: "https://luftdata.se/" }, " luftdata.se"),
            m("div", { style: { height: "2rem", width: "100 %" } }),

            auth.token
                ? null
                :
                [
                    m("p", "Logga in för utökad funktionalitet"),
                    m("div", { style: { height: "2rem", width: "100 %" } }),
                    m(
                        "a.button",
                        { href: "/login", oncreate: m.route.link },
                        "Logga in"
                    )
                ],
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
