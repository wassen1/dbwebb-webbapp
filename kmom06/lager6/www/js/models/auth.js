import m from "mithril";

var auth = {
    email: "",
    password: "",
    token: "",

    clear: () => {
        auth.email = "";
        auth.password = "";
    },

    register: () => {
        let baseURL = "https://lager.emilfolino.se/v2/";

        let payload = {
            api_key: "c9cf1b388eaca7e83a076bade6bd0431",
            email: auth.email,
            password: auth.password
        };

        return m
            .request({
                method: "POST",
                url: `${baseURL}auth/register`,
                data: payload
            })
            .then(() => {
                auth.login();
            });
    },

    login: () => {
        let baseURL = "https://lager.emilfolino.se/v2/";

        let payload = {
            email: auth.email,
            password: auth.password,
            api_key: "c9cf1b388eaca7e83a076bade6bd0431"
        };

        return m
            .request({
                method: "POST",
                url: `${baseURL}auth/login`,
                data: payload
            })
            .then(result => {
                auth.token = result.data.token;
                // console.log(auth.token);
                auth.clear();
                m.route.set("/orders");
            });
    },
    logout: () => {
        auth.token = "";
        m.redraw();
    }
};

export default auth;
