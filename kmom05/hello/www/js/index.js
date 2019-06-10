
var m = require("mithril");
var hello = require("./views/hello.js")

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        console.log("Ready to take off");
        m.mount(document.body, hello);
    }
};
app.initialize();
