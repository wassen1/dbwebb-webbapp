let utils = {
    getNow: () => {
        return new Date();
    },

    getApiKey: () => {
        return "c9cf1b388eaca7e83a076bade6bd0431";
    },

    getBaseUrl: () => {
        return "https://lager.emilfolino.se/v2/";
    },
    slideH: function (vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function (resolve) {
            setTimeout(function () {
                vnode.dom.classList.remove("slide-out");
                resolve();
            }, 250);
        });
    },
};

export default utils;
