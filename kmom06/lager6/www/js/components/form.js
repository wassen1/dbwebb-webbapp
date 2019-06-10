import m from "mithril";
import deliveriesModel from "../models/deliveriesModel.js";
import productModel from "../models/productModel.js";
import utils from "../models/utils.js";

let form = {
    oninit: () => {
        [
            deliveriesModel.getDeliveries,
            productModel.getProducts()
        ];
    },
    onbeforeremove: utils.slideH,
    view: () => {
        return m("div.slide-in", [
            m("h1", "Ny inleverans"),
            m(
                "form.form.wrapper",
                {
                    onsubmit: event => {
                        event.preventDefault();
                        deliveriesModel.save();
                    }
                },
                [
                    m("label.input-label", "Produkt"),
                    m(
                        "select[required].input",
                        {
                            onchange: e => {
                                deliveriesModel.currentDelivery.product_id = parseInt(
                                    e.target.value
                                );
                            }
                        },
                        [{ name: "Välj...", id: "" }]
                            .concat(productModel.currentProducts).map(product => {
                                return m(
                                    "option",
                                    { value: product.id },
                                    product.name
                                );
                            })
                    ),
                    m("label.input-label", "Antal"),
                    m(
                        "input[type=number][placeholder=antal...][required].input",
                        {
                            oninput: e => {
                                deliveriesModel.currentDelivery.amount =
                                    e.target.value;
                            },
                            value: deliveriesModel.currentDelivery.amount
                        }
                    ),
                    m("label.input-label", "Leveransdatum"),
                    m("input[type=date][required].input", {
                        oninput: e => {
                            deliveriesModel.currentDelivery.delivery_date =
                                e.target.value;
                        },
                        value: deliveriesModel.currentDelivery.delivery_date
                    }),
                    m("label.input-label", "Kommentar"),
                    m(
                        "textarea[spellcheck=true][placeholder=kommentar...].input",
                        {
                            oninput: e => {
                                deliveriesModel.currentDelivery.comment =
                                    e.target.value;
                            },
                            value: deliveriesModel.currentDelivery.comment
                        }
                    ),
                    m(
                        "input[type=submit][value=Gör inleverans].button",
                        "Gör inleverans"
                    )
                ]
            )
        ]);
    }
};

export default form;
