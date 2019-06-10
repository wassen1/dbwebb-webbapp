import m from "mithril";
import utils from "./utils.js";

let baseURL = utils.getBaseUrl();
let apiKey = utils.getApiKey();

let productModel = {

    currentProduct: [],
    currentProducts: [],
    getProduct: id => {
        return m
            .request({
                url: `${baseURL}products/${id}?api_key=${apiKey}`,
                method: "GET"
            })
            .then(result => {
                productModel.currentProduct = result.data;
                return productModel.currentProduct;
            });
    },
    getProducts: () => {
        return m
            .request({
                url: `${baseURL}products?api_key=${apiKey}`,
                method: "GET"
            })
            .then(result => {
                productModel.currentProducts = result.data;
                return productModel.currentProducts;
            });
    },
    updateStock: (dataObj, amount) => {
        return m.request({
            method: "PUT",
            url: `${baseURL}products`,
            data: Object.assign(dataObj, {
                id: dataObj.id,
                name: dataObj.name,
                stock: dataObj.stock + parseInt(amount),
                api_key: apiKey
            })
        });
    }
};

export default productModel;
