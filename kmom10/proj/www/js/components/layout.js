import m from "mithril";
import menu from "../components/menu.js";
import weatherComponent from "./weatherComponent.js";
import position from "../models/position.js";

let layout = {
    oninit: () => {
        position.getCurrentPosition(console.log);
    },

    view: vnode => {
        return [
            m("nav.top-nav", [
                m(weatherComponent, { title: "Väder kommande timme", lat: position.currentPosition.lat, lng: position.currentPosition.lng, timeSeries: 0 }), // eslint-disable-line max-len
                m("div", "Particle Finder"),
                vnode.attrs.back ? m("a.back", { href: vnode.attrs.href, oncreate: m.route.link },
                    m("i", {
                        type: "i",
                        className: "material-icons",
                        textContent: "arrow_back_ios"
                    })) : "",
            ]),

            m("main.container#mainContainer", vnode.children),
            m(
                "nav.bottom-nav#navigation",
                m(menu, { selected: vnode.attrs.selected })
            )
        ];
    }
};

export default layout;
