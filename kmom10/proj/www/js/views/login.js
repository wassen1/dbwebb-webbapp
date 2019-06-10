import m from "mithril";
import auth from "../models/auth.js";

let login = {
    oninit: auth.clear,
    error: false,
    view: () => {
        return m("div.slide-in", [
            m("h1", "Logga in"),
            m(
                "form",
                {
                    onsubmit: event => {
                        event.preventDefault();
                        auth.login().catch(() => {
                            login.error = true;
                        });
                    }
                },
                [
                    m("label.input-label", "E-post"),
                    m(
                        "input[type=email][placeholder=epost...][required].input",
                        {
                            oninput: e => {
                                auth.email = e.target.value;
                            },
                            value: auth.email
                        }
                    ),
                    m("label.input-label", "Lösenord"),
                    m(
                        "input[type=password][placeholder=lösenord...][required].input",
                        {
                            oninput: e => {
                                auth.password = e.target.value;
                            }
                        }
                    ),
                    m(
                        "input[type=submit] [value=Logga in].button",

                        "Logga in"
                    ),
                    login.error
                        ? m(
                            "h4",
                            { style: { color: "red" } },
                            "fel email eller lösenord"
                        )
                        : ""
                ]
            )
        ]);
    }
};

export default login;
