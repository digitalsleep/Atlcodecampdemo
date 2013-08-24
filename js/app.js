

// create our namespace
var RocknCoder = RocknCoder || {};

// wrap all of our code in a function
RocknCoder.Code = (function (RocknCoder, $) {
  "use strict";

  /*
   * event handlers for the compass stuff, one for updating the header text
   * the other for rotating the compass
   */

  RocknCoder.Compass = (function () {
    var lastHeading = -1,
      // cache the jQuery selectors for performance improvement
      $headText = $("header > h1"),
      $compass = $("#compass"),
      // displays the degree
      updateHeadingText = function (event, heading) {
        event.preventDefault();
        $headText.html(heading + "&deg;");
      },
      // adjusts the rotation of the compass
      updateCompass = function (event, heading) {
        event.preventDefault();

         // to make the compass dial point the right way
         var rotation = 360 - heading,
         rotateDeg = 'rotate(' + rotation + 'deg)';
         // TODO: fix - this code only works on webkit browsers, not wp7
        $compass.css('-webkit-transform', rotateDeg);
      };
    // bind both of the event handlers to the "newHeading" event
    $("body").on("newHeading", updateCompass).on("newHeading", updateHeadingText);
  }());

  // Step 2: Wait for the Cordova deviceready event
  var CompassInit = function () {
    console.log("device ready!!!");

    // Step 3: Once we have the deviceready event, hook the compass
    RocknCoder.WatchId = navigator.compass.watchHeading(function (heading) {
      // only magnetic heading works universally on iOS and Android
      // round off the heading then trigger newHeading event for any listeners
      var newHeading = Math.round(heading.magneticHeading);
      $("body").trigger("newHeading", [newHeading]);
    }, function (error) {
      navigator.compass.clearWatch(RocknCoder.WatchId);
      // if we get an error, show its code
      alert("Compass error: " + error.code);
    }, {frequency: 100});
  }

  // Step 1: Wait for both jQuery Mobile and PhoneGap to initialize
  RocknCoder.app.initialize(CompassInit);
}(RocknCoder, jQuery));