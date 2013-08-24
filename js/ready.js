

// create our namespace
var RocknCoder = RocknCoder || {};

(function (RocknCoder) {
  "use strict"
  var jqmReady = $.Deferred(),
    pgReady = $.Deferred();

    RocknCoder.app = {
      // Callback for when the app is ready
      callback: null,

      // Application Constructor
      initialize: function (callback) {
        this.callback = callback;
        var browser = document.URL.match(/^https?:/);
        if (browser) {
          console.log("Is web.");
          // In case of web we ignore PG but resolve the Deferred Object to trigger initialization
          pgReady.resolve();
        }
        else {
          console.log("Is not web.");
          this.bindEvents();
        }
      },
      bindEvents: function () {
        document.addEventListener("deviceready", this.onDeviceReady, false);
      },
      onDeviceReady: function () {
        // The scope of 'this' is the event, hence we need to use app.
        RocknCoder.app.receivedEvent("deviceready");
      },
      receivedEvent: function (event) {
        switch (event) {
          case "deviceready":
            pgReady.resolve();
            break;
        }
      }
    };

  $(document).on("pageinit", function (event, ui) {
    jqmReady.resolve();
  });

  /**
   * General initialization.
   */
  $.when(jqmReady, pgReady).then(function () {
    // Initialization code here
    if (RocknCoder.app.callback) {
      RocknCoder.app.callback();
    }
    console.log("Frameworks ready.");
  });
}(RocknCoder));