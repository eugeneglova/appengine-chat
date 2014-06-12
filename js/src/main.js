require.config({
    paths: {
        jquery: "../libs/jquery/jquery-1.11.1.min",
        underscore: "../libs/underscore/underscore-min",
        backbone: "../libs/backbone/backbone-min",
        service: "modules/service",
        ui: "modules/ui"
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

define(["service/message/index"], function (MessageService) {

    app.modules = {
        service: {},
        ui: {}
    };

    app.modules.service.message = new MessageService({
        token: window.app.token
    });

    return true;
});
