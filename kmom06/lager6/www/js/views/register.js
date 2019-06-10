import m from "mithril";
import auth from "../models/auth.js";
import utils from "../models/utils.js";

let register = {
    oninit: auth.clear,
    onbeforeremove: utils.slideH,
    view: () => {
        return m("div.slide-in",
            [
                m("h1", "Registrera användare"),
                m(
                    "form",
                    {
                        onsubmit: event => {
                            event.preventDefault();
                            auth.register();
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
                        m("div", [
                            m("input[type=checkbox][value=register][name=registerForm][required]#register.checkbox"),   //eslint-disable-line max-len
                            m("label[for=register]", "Godkänn att data du skriver in i formuläret lagras.")             //eslint-disable-line max-len
                        ]
                        ),
                        m(
                            "input[type=submit] [value=Registrera].button",

                            "Registrera"
                        )
                    ]
                )
            ]
        );
    }
};

export default register;
