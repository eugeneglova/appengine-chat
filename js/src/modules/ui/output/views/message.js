define(["backbone", "hbs!../templates/message"], function(Backbone, template) {

    return Backbone.View.extend({

        template: template,

        className: "message",

        // Will be overrided during extension this view
        message: "Example message text",


        /**
         * render
         *
         * @return {Object}
         */
        render: function() {
            // Render template with message
            this.$el.append(this.template({
                message: this.message
            }));

            return true;
        }

    });

    return true;
});
