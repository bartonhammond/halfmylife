/**
@license
Copyright (c) 2015 Barton Hammond . All rights reserved.
*/

(function() {
  'use strict';

  Polymer({
    is: 'calculate-halflife',
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
      var origMeet = moment(signifdateStr, 'YYYY-MM-DD', true);

      if (meet.diff(birth,'days') < 0) {
        this.message = 'Significant date should be later or after then birthday.';
        document.querySelector('#toastOK').show();
        return;
      }
      
      var dates = [];
      
      while(meet.diff(birth,'years') < 100) {
        meet.add(1,'days');
        var daysOldNow = meet.diff(birth,'days');
        var meetDays = meet.diff(origMeet, 'days');

        var pct = (meetDays/daysOldNow) * 100;
        
        if (pct > 0 && (pct % 10 === 0)) {
          dates.push({adate: meet.format('dddd, MMMM Do YYYY'), pct: pct});
        } else {
          pct = Math.floor(pct);
          if (pct > 0 && ( pct % 10 ===0)) {
            var found = false;
            for (var i = 0; i < dates.length; i++) {
              if (dates[i].pct === pct) {
                found = true;
                break;
              }
            }
            
            if (!found) {
              dates.push({adate: meet.format('dddd, MMMM Do YYYY'), pct: Math.floor(pct)});
            }
          }

        }
      }//while
      this.mydates = dates;
      this.calculated=true;
    }

  });
})();
