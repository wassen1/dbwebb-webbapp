var baseURL = "https://lager.emilfolino.se/v2";
var apiKey = "c9cf1b388eaca7e83a076bade6bd0431";
var products = {
    allProducts: [],

    refreshAllProducts: () => {
        products.allProducts = [];
    },
    getAllProducts: callback => {
        if (products.allProducts.length > 0) {
            if (callback) {
                return callback(products.allProducts);
            } else {
                return products.allProducts;
            }
        }
        fetch(
            `${baseURL}/products?api_key=${apiKey}`
            // "https://dbwebb-lager.steen.ninja/products"
        )
            .then(response => response.json())
            .then(result => {
                products.allProducts = result.data;
                if (callback) {
                    return callback(products.allProducts);
                }
            });
    },
    getProduct: productId => {
        return products.allProducts.filter(product => {
            return product.id == productId;
        })[0];
    },
    deleteProduct: (id) => {
        var product = {
            id: id,
            api_key: apiKey
        };

        fetch("https://lager.emilfolino.se/v2/products", {
            body: JSON.stringify(product),
            headers: {
                "content-type": "application/json"
            },
            method: "DELETE"
        }).then(function() {
            products.allProducts = [];
        });
    }
};

export { products };
