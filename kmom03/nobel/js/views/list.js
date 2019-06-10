"use strict";
import m from 'mithril';

let list = {
    view: function () {
        var startYear = 2010;
        var endYear = 2017;
        var years = [];

        while (startYear <= endYear) {
            years.push(
                m("a.button.blue-button",
                    { href: "/year/" + startYear, oncreate: m.route.link },
                    startYear)
            );
            startYear++;
        }

        return m("main.container", [
            m("h1", "Nobelfesten"),
            m("p", "Välj ett årtal i listan:"),
            m("div.year-container", years)
        ]);
    }
};

export { list };
