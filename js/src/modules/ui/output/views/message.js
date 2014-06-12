define(["backbone", "hbs!../templates/message"], function(Backbone, template) {

    return Backbone.View.extend({

        template: template,

        className: "message",

        // Holds a message
        message: null,

        // Holds a nickname
        nickname: null,


        /**
         * initialize
         *
         * @return {Object}
         */
        initialize: function(options) {
            this.message = options.message;
            this.nickname = options.nickname;

            return this;
        },


        /**
         * render
         *
         * @return {Object}
         */
        render: function() {
            // Render template with message
            this.$el.append(this.template({
                message: this.message,
                nickname: this.nickname
            }));

            return true;
        }

    });

    return true;
});
