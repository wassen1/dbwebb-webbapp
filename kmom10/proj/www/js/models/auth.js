import m from "mithril";

let baseURL = "https://auth.emilfolino.se/";
let apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxx";

var auth = {
    email: "",
    password: "",
    token: "",


    clear: () => {
        auth.email = "";
        auth.password = "";
    },

    register: () => {
        let payload = {
            api_key: apiKey,
            email: auth.email,
            password: auth.password
        };

        return m
            .request({
                method: "POST",
                url: `${baseURL}register`,
                data: payload
            })
            .then(() => {
                auth.login();
            });
    },

    login: () => {
        let payload = {
            email: auth.email,
            password: auth.password,
            api_key: apiKey
        };

        return m
            .request({
                method: "POST",
                url: `${baseURL}login`,
                data: payload
            })
            .then(result => {
                auth.token = result.data.token;
                // console.log(auth.token);
                auth.clear();
                m.route.set("/weather");
            });
    },
    logout: () => {
        auth.token = "";
        m.redraw();
    }
};

export default auth;
