import m from "mithril";
import deliveries from "../js/models/deliveries.js";

var form = {

    oninit: deliveries.getDeliveries,
    view: () => {
        return m("main.container", [
            m("h1", "Ny inleverans"),
            m(
                "form",
                {
                    onsubmit: (event) => {
                        event.preventDefault();
                        deliveries.save();
                    }
                },
                [
                    m("label.input-label", "Produkt"),
                    m(
                        "select[required].input",
                        {
                            onchange: (e) => {
                                deliveries.currentDelivery.product_id = parseInt(
                                    e.target.value
                                );
                            }
                        },
                        deliveries.products.map((product) => {
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
                            oninput: (e) => {
                                deliveries.currentDelivery.amount =
                                    e.target.value;
                            },
                            value: deliveries.currentDelivery.amount
                        }
                    ),
                    m("label.input-label", "Leveransdatum"),
                    m("input[type=date][required].input", {
                        oninput: (e) => {
                            deliveries.currentDelivery.delivery_date =
                                e.target.value;
                        },
                        value: deliveries.currentDelivery.delivery_date
                    }),
                    m("label.input-label", "Kommentar"),
                    m(
                        "textarea[spellcheck=true][placeholder=kommentar...].input",
                        {
                            oninput: (e) => {
                                deliveries.currentDelivery.comment =
                                    e.target.value;
                            },
                            value: deliveries.currentDelivery.comment
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
