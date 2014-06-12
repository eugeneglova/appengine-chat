define(["backbone", "hbs!./templates/index"], function (Backbone, template) {

    // Use view as a simple module wrapper
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
         * onMessage
         *
         * When message is received
         *  - transmit message via global bus
         *
         * @return {Boolean}
         */
        onMessage: function(msg) {
            // Use Backbone as global bus to exchange messages with other modules
            Backbone.trigger("service:message:received", msg.data);

            console.info("Message Received: ", msg, ", Data:", msg.data);

            return true;
        },


        /**
         * onError
         *
         * When error is happened
         *
         * @return {Boolean}
         */
        onError: function(e) {
            console.info("CHANNEL Error. Code:", e.code, ", Description: ", e.description);

            return true;
        },


        /**
         * onClose
         *
         * When socket is closed
         *
         * @return {Boolean}
         */
        onClose: function() {
            console.info("Close Channel");

            return true;
        },


        /**
         * onSend
         *
         * When other module sends us a message
         *
         * @return {Boolean}
         */
        onSend: function(msg) {
            // Send a message
            this.socket.send(msg);

            console.info("Message Sent:", msg);

            return true;
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

    return true;
});
