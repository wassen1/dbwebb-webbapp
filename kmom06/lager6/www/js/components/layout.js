import m from "mithril";
import menu from "../views/menu.js";

let layout = {
    view: vnode => {
        return [

            m("nav.top-nav", [
                m("div", "Skruvar & muttrar AB"),
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
