require.config({
    paths: {
        jquery: "../libs/jquery/jquery-1.11.1.min",
        underscore: "../libs/underscore/underscore-min",
        backbone: "../libs/backbone/backbone-min",
        handlebars: "../libs/handlebars/handlebars-v1.3.0",
        text: "../libs/require/text",
        hbs: "../libs/require/hbs",
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
        },
        "handlebars": {
            exports: "Handlebars"
        }
    }
});

define(["jquery", "service/message/index", "ui/input/index", "ui/output/index"], function($, MessageService, InputView, OutputView) {
    var body;

    app.modules = {
        service: {},
        ui: {}
    };

    // Initialize service modules
    app.modules.service.message = new MessageService({
        token: window.app.token
    });

    // Initialize UI modules
    app.modules.ui.output = new OutputView();
    app.modules.ui.input = new InputView();

    // Cache body
    body = $(document.body);

    // Loop through all UI modules
    Object.keys(app.modules.ui).forEach(function(module_name) {
        var module = app.modules.ui[module_name];

        // Append each one to the body
        body.append(module.$el);

        // Render module
        module.render();
    }, this);

    return true;
});
