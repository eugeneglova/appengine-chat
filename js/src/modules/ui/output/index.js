define(["underscore", "backbone", "./views/message"], function(_, Backbone, MessageView) {

    return Backbone.View.extend({

        className: "output",

        // Holds child views
        views: null,


        /**
         * initialize
         *
         * @return {Object}
         */
        initialize: function() {
            this.views = {};

            Backbone.on("service:message:received", this.onMessageReceived, this);

            return this;
        },


        /**
         * onMessageReceived
         *
         * When message is received
         *  - output it to chat
         *
         * @param {String} msg
         * @return {Boolean}
         */
        onMessageReceived: function(msg) {
            var message_view;

            if ( ! msg) return false;

            // Initialize message view
            message_view = new MessageView({
                message: msg
            });

            // Append view to the output
            this.$el.append(message_view.$el);

            // Render view
            message_view.render();

            // Save view in child views
            this.views[_.uniqueId("view")] = message_view;

            return true;
        },


        /**
         * remove
         *
         * @return {Object}
         */
        remove: function() {
            // Remove child views
            Object.keys(this.views).forEach(function(view_name) {
                this.views[view_name].remove();
            }, this);

            // Call native remove
            return Backbone.View.prototype.remove.apply(this, arguments);
        }

    });

    return true;
});
