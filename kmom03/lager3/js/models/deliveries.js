import m from "mithril";
import product from "./product.js";


var deliveries = {
    products: [
        { id: "", name: "Välj..." },
        { id: 3496, name: "Skruv M6" },
        { id: 3495, name: "Skruv M8" },
        { id: 3494, name: "Skruv M10" },
        { id: 3493, name: "Skruv M12" },
        { id: 3492, name: "Skruv M14" },
        { id: 3501, name: "Mutter M6" },
        { id: 3500, name: "Mutter M8" },
        { id: 3499, name: "Mutter M10" },
        { id: 3498, name: "Mutter M12" },
        { id: 3497, name: "Mutter M14" }
    ],
    baseURL: "https://lager.emilfolino.se/v2/",
    apiKey: "c9cf1b388eaca7e83a076bade6bd0431",
    currentDeliveries: [],
    getDeliveries: () => {
        return m
            .request({
                url:
                    deliveries.baseURL +
                    "deliveries?api_key=" +
                    deliveries.apiKey,
                method: "GET"
            })
            .then((result) => {
                deliveries.currentDeliveries = result.data;
            });
    },
    currentDelivery: {},
    save: () => {
        product
            .getProduct(deliveries.currentDelivery.product_id)
            .then(prodObj => {
                product
                    .updateStock(prodObj, deliveries.currentDelivery.amount)
                    .then(() => {
                        return m
                            .request({
                                method: "POST",
                                url: product.baseURL + "deliveries",
                                data: {
                                    ...deliveries.currentDelivery,
                                    api_key: product.apiKey
                                }
                            })
                            .then(() => {
                                m.route.set("/");
                            });
                    });
            });
    }
};

export default deliveries;
