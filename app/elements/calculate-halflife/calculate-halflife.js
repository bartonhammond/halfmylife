/**
   @license
   Copyright (c) 2015 Barton Hammond . All rights reserved.
*/

(function() {
  'use strict';

  Polymer({
    is: 'calculate-halflife',
    error: function(msg) {
      console.log(msg);
    },

    ready: function() {
      //addthisevent needs to display button
      this.$.calendardates.addEventListener('dom-change', function() {
        addthisevent.refresh();
      });
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

      var dates = [];

      var daysOldAtMeet = meet.diff(birth,'days');
      
      for (var fraction = 0; fraction < this.fractions.length; fraction++) {
        var pct = this.fractions[fraction].pct;
        var daysAfterMeet = (daysOldAtMeet * pct) / (1 - pct);
        var daysOldAfterMeet = daysOldAtMeet + daysAfterMeet;
        var celebrationDate = birth.clone();
        celebrationDate.add(daysOldAfterMeet, 'days');
        
         
        if (celebrationDate.diff(meet, 'years') < 100) {
          var displayStyle = 'margin-left: 5px; color: #4285f4!important;font-weight: 600;';
          if (celebrationDate.diff(moment(),'days') < 0) {
            displayStyle = 'display: none';
          }
          
          var title = this.$.title.value;
          
          dates.push({adate: celebrationDate.format('dddd, MMMM Do YYYY'),
                      pct: this.fractions[fraction].txt,
                      style: displayStyle,
                      start: celebrationDate.format('MM/DD/YYYY'),
                      end: celebrationDate.format('MM/DD/YYYY'),
                      timezone: 'America/Chicago',
                      title: title,
                      description: 'I have lived ' + this.fractions[fraction].txt + ' of my life since ' + meet.format('dddd, MMMM Do YYYY') + '!  Time to celebrate!!!'
                     });
        }
      }
  
      this.mydates = dates;
      this.calculated=true;

  
    }

  });
})();
