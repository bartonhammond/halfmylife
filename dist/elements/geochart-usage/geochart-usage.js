/**
   @license
   Copyright (c) 2015 Barton Hammond . All rights reserved.
*/

(function() {
  'use strict';

  Polymer({
    is: 'geochart-usage',
    ready: function() {
      this.data =
        [['Country', 'Popularity'],
         ['Germany', 200],
         ['United States', 300],
         ['Brazil', 400],
         ['Canada', 500],
         ['France', 600],
         ['RU', 700]];
    }
  });
})();

