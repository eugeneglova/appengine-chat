define(["backbone"], function(Backbone) {

    // Use view as a simple module wrapper
    return Backbone.View.extend({

        // Holds app engine channel
        channel: null,

        // Holds channel socket
        socket: null,

        // Holds nickname
        nickname: null,


        /**
         * initialize
         *
         * @return {Object}
         */
        initialize: function(options) {
            // Save nickname
            this.nickname = options.nickname;

            // Init channel with user token
            this.channel = new goog.appengine.Channel(options.token);

            // Open socket to exchange messages
            this.socket = this.channel.open();

            // Add handlers for all states
            this.socket.onopen = this.onOpen;
            this.socket.onmessage = this.onMessage;
            this.socket.onerror = this.onRrror;
            this.socket.onclose = this.onClose;

            // Receive messages from other modules and transmit them
            Backbone.on("service:message:send", this.onSend, this);

            return this;
        },


        /**
         * onOpen
         *
         * When channel is opened
         *
         * @return {Boolean}
         */
        onOpen: function() {
            console.info("Channel API Connection is open.");

            return true;
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
            var data = JSON.parse(msg.data);

            // Use Backbone as global bus to exchange messages with other modules
            Backbone.trigger("service:message:received", data);

            console.info("Message Received:", data);

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
         * @param {String} msg
         * @return {Boolean}
         */
        onSend: function(msg) {
            // Send a message
            this.socket.send(JSON.stringify({
                nickname: this.nickname,
                message: msg
            }));

            console.info("Message Sent:", msg);

            return true;
        }

    });

    return true;
});
