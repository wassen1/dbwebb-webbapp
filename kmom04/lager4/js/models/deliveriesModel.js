import m from "mithril";
import productModel from "./productModel.js";
import utils from "./utils.js";

let baseURL = utils.getBaseUrl();
let apiKey = utils.getApiKey();

let deliveriesModel = {


    currentDeliveries: [],
    getDeliveries: () => {
        return m
            .request({
                url: `${baseURL}deliveries?api_key=${apiKey}`,
                method: "GET"
            })
            .then(result => {
                deliveriesModel.currentDeliveries = result.data;
            });
    },
    currentDelivery: {},
    save: () => {
        productModel
            .getProduct(deliveriesModel.currentDelivery.product_id)
            .then(prodObj => {
                productModel
                    .updateStock(
                        prodObj,
                        deliveriesModel.currentDelivery.amount
                    )
                    .then(() => {
                        return m
                            .request({
                                method: "POST",
                                url: baseURL + "deliveries",
                                data: {
                                    ...deliveriesModel.currentDelivery,
                                    api_key: apiKey
                                }
                            })
                            .then(() => {
                                m.route.set("/deliveries");
                            });
                    });
            });
    }
};

export default deliveriesModel;
