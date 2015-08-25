/**
   @license
   Copyright (c) 2015 Barton Hammond . All rights reserved.
*/

window.addEventListener('WebComponentsReady', function() {

  // We use Page.js for routing. This is a Micro
  // client-side router inspired by the Express router
  // More info: https://visionmedia.github.io/page.js/

  //relative routing
//  page.base('/halfmylife');
  
  page('halfmylife/', function () {
    app.route = 'home';
  });

  page('halfmylife/calculate', function () {
    app.route = 'calculate';
  });
  
  page('halfmylife//license', function () {
    app.route = 'license';
  });

  page('halfmylife/contact', function () {
    app.route = 'contact';
  });


  // add #! before urls
  page.start({
    hashbang: true
  });

});

