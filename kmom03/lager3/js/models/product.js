import m from "mithril";

var product = {
    baseURL: "https://lager.emilfolino.se/v2/",
    apiKey: "c9cf1b388eaca7e83a076bade6bd0431",
    currentProduct: [],
    getProduct: (id) => {
        return m
            .request({
                url: `${product.baseURL}products/${id}?api_key=${
                    product.apiKey
                    }`, //eslint-disable-line indent
                method: "GET"
            })
            .then((result) => {
                product.currentProduct = result.data;
                return product.currentProduct;
            });
    },
    updateStock: (dataObj, amount) => {
        return m
            .request({
                method: "PUT",
                url: `${product.baseURL}products`,
                data: {
                    ...dataObj,
                    id: dataObj.id,
                    name: dataObj.name,
                    stock: dataObj.stock + parseInt(amount),
                    api_key: product.apiKey
                }
            });
    }
};

export default product;
