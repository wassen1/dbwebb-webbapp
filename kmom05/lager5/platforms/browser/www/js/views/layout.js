import m from "mithril";
import menu from "./menu.js";

let layout = {
    view: vnode => {
        return [
            m("nav.top-nav", "Skruvar & muttrar AB"),
            m("main.container#mainContainer", vnode.children),
            m(
                "nav.bottom-nav#navigation",
                m(menu, { selected: vnode.attrs.selected })
            )
        ];
    }
};

export default layout;
