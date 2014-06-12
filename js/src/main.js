require.config({
    paths: {
        jquery: "../libs/jquery/jquery-1.11.1.min",
        underscore: "../libs/underscore/underscore-min",
        backbone: "../libs/backbone/backbone-min"
    },
    shim: {
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        "underscore": {
            exports: "_"
        }
    }
});

define(["backbone"], function (Backbone) {
    var app = window.app;

    app.channel = new goog.appengine.Channel(app.token);

    app.socket = app.channel.open();

    app.socket.onopen = function() {
        console.info("Channel API Connection is open.");
    };

    app.socket.onmessage = function(msg) {
       console.info("Message Received: ", msg, ", Data: " + msg.data);
    };

    app.socket.onerror = function(e) {
        console.info("CHANNEL Error. Code: " + e.code + ", Description: " + e.description);
    };

    app.socket.onclose = function() {
        console.info("Close Channel");
    };

    return true;
});
