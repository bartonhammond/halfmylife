/**
   @license
   Copyright (c) 2015 Barton Hammond . All rights reserved.
*/

(function() {
  'use strict';

  Polymer({
    is: 'calculate-halflife',
    success: function(position) {
      /*jshint camelcase: false */
      var geocoder = new google.maps.Geocoder();
      var latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {

          var countryIsUSA = false;
          for (var i = 0; i < results.length; i++) {
            if ('country' === results[i].types[0] && 'US' === results[i].address_components[0].short_name) {
              countryIsUSA = true;
              break;
            }
          }//for
          
          if (countryIsUSA) {
            for (i = 0; i < results.length; i++) {
              if ( 'administrative_area_level_1' === results[i].types[0]) {
                var state = results[i].address_components[0].short_name;
                console.log('USA ' + state);
                break;
              }
            }
          }//if USA
        } //if OK
      });

    },
    error: function(msg) {
      console.log(msg);
    },
    ready: function() {
      this.mydates = [
      ];     
    },
    properties: {
      message: {
        type: String,
        value: 'calculate-halflife'
      },
      calculated: {
        type: Boolean,
        value: false
      },
      fractions: {
        type: Array,
        value: [{pct: 1/10, txt: '1/10'},
                {pct: 2/10, txt: '1/5'},
                {pct: 1/3, txt: '1/3'},
                {pct: 4/10, txt: '2/5'},
                {pct: 1/2, txt: '1/2'},
                {pct:  3/5, txt: '3/5'},
                {pct: 7/10, txt: '7/10'},
                {pct: 8/10, txt: '4/5'},
                {pct: 9/10, txt: '9/10'}
               ]
      }
    },
    addZeroIfNecessary: function(value) {
      if (value <= 9) {
        value = '0' + value;
      }
      return value;
    },
    getDate: function(month, day, year) {
      var _month = this.addZeroIfNecessary(month);

      var _day = this.addZeroIfNecessary(day);

      var dateString = '' + year + '-' + _month + '-' + _day;
      return dateString;
    },
    calculateHalflife: function(){

      this.calculated = false;
      
      var birthdateStr = this.getDate(this.$.birthdayMonth.value,
                                      this.$.birthdayDay.value,
                                      this.$.birthdayYear.value);
      if (! moment(birthdateStr, 'YYYY-MM-DD', true).isValid()) {
        this.message = 'Birthday is not valid.  Please review.';
        document.querySelector('#toastOK').show();
        return;
      }
      
      var signifdateStr = this.getDate(this.$.signifMonth.value,
                                       this.$.signifDay.value,
                                       this.$.signifYear.value);
      if (! moment(signifdateStr, 'YYYY-MM-DD', true).isValid()) {
        this.message = 'Significant date is not valid.  Please review.';
        document.querySelector('#toastOK').show();
        return;
      }
      

      var birth = moment(birthdateStr, 'YYYY-MM-DD', true);
      var meet = moment(signifdateStr, 'YYYY-MM-DD', true);

      if (meet.diff(birth,'days') < 0) {
        this.message = 'Significant date should be later or after the birthday.';
        document.querySelector('#toastOK').show();
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
      }

      var dates = [];

      var daysOldAtMeet = meet.diff(birth,'days');
      
      for (var fraction = 0; fraction < this.fractions.length; fraction++) {
        console.log(this.fractions[fraction].pct + '=' + this.fractions[fraction].txt);
        var pct = this.fractions[fraction].pct;
        var daysAfterMeet = (daysOldAtMeet * pct) / (1 - pct);
        var daysOldAfterMeet = daysOldAtMeet + daysAfterMeet;
        var celebrationDate = birth.clone();
        celebrationDate.add(daysOldAfterMeet, 'days');

        if (celebrationDate.diff(meet, 'years') < 100) {
          dates.push({adate: celebrationDate.format('dddd, MMMM Do YYYY'),
                       pct: this.fractions[fraction].txt});
        }
      }

      this.mydates = dates;
      this.calculated=true;
    }

  });
})();
