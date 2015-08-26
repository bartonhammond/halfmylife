/**
   @license
   Copyright (c) 2015 Barton Hammond . All rights reserved.
*/

window.addEventListener('WebComponentsReady', function() {

  // We use Page.js for routing. This is a Micro
  // client-side router inspired by the Express router
  // More info: https://visionmedia.github.io/page.js/

  //relative routing
//  page.base('halfmylife/');
  
  page('/', function () {
    app.route = 'home';
  });

  page('/calculate', function () {
    app.route = 'calculate';
  });
  
  page('/license', function () {
    app.route = 'license';
  });

  page('/about', function () {
    app.route = 'about';
  });


  // add #! before urls
  page.start({
    hashbang: true
  });

});

