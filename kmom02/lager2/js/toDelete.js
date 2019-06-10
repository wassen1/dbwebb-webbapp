import orders from "../src/orders.js";
import { products } from "../src/products.js";



let toDelete = (() => {
    function deleteOrders(ord) {
        ord.forEach(item => {
            orders.deleteOrder(item.id);
        });
    }

    function deleteProducts(prod) {
        prod.forEach(item => {
            products.deleteProduct(item.id);
        });
    }

    function order() {
        orders.getOrders(deleteOrders);
    }

    function product() {
        products.getAllProducts(deleteProducts);
    }

    let publicAPI = {
        orders: order,
        products: product
    };

    return publicAPI;
})();

export default toDelete;
