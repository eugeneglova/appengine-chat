define(["backbone", "hbs!./templates/index"], function(Backbone, template) {

    return Backbone.View.extend({

        template: template,

        className: "input",

        events: {
            "keypress input[type=text]": "onKeypressInput",
            "click input[type=button]": "onClickButton"
        },


        /**
         * onKeypressInput
         *
         * When user press an enter key on input it sends message
         *
         * @param {jQuery.Event} e
         * @return {Boolean}
         */
        onKeypressInput: function(e) {
            var input;

            if (e.which !== 13) return true;

            input = this.$(e.currentTarget);

            this._sendMessage(input.val());

            this.render();

            return true;
        },


        /**
         * onClickButton
         *
         * When user click send button
         *
         * @param {jQuery.Event} e
         * @return {Boolean}
         */
        onClickButton: function(e) {
            var input = this.$("input[type=text]");

            this._sendMessage(input.val());

            this.render();

            return true;
        },


        /**
         * render
         *
         * @return {Object}
         */
        render: function() {
            // Render template
            this.$el.html(this.template());

            // Focus input after render
            this.$("input[type=text]").focus();

            return this;
        },


        /**
         * _sendMessage
         *
         * Sends a message
         *
         * @param {String} msg
         * @return {Boolean}
         */
        _sendMessage: function(msg) {
            if ( ! msg) return false;

            // Send a message to message service via global bus
            Backbone.trigger("service:message:send", msg);

            return true;
        }

    });

});
