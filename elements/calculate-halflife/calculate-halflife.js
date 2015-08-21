(function() {
  'use strict';

  Polymer({
    is: 'calculate-halflife',

    properties: {
      message: {
        type: String,
        value: 'calculate-halflife barton'
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

      var birthdate = this.getDate(this.$.birthdayMonth.value,
                              this.$.birthdayDay.value,
                              this.$.birthdayYear.value);
      if (! moment(birthdate, 'YYYY-MM-DD', true).isValid()) {
        this.message = 'Birthday is not valid.  Please review.';
        document.querySelector('#toastOK').show();
        return;
      }
      
      var signifdate = this.getDate(this.$.signifMonth.value,
                                    this.$.signifDay.value,
                                    this.$.signifYear.value);
      if (! moment(signifdate, 'YYYY-MM-DD', true).isValid()) {
        this.message = 'Significant date is not valid.  Please review.';
        document.querySelector('#toastOK').show();
        return;
      }

      var now = moment(new Date());

      var birth = moment(birthdate, 'YYYY-MM-DD', true);

      var meet = moment(signifdate, 'YYYY-MM-DD', true);

      var daysFromBirth = now.diff(birth,'days');
      var daysSinceMeeting = now.diff(meet,'days');
      var moreThenHalf = (daysFromBirth/2) - daysSinceMeeting;



      while (moreThenHalf > 0) {
        now.add(1,'days');
        daysFromBirth = now.diff(birth,'days');
        daysSinceMeeting = now.diff(meet,'days');
        moreThenHalf = (daysFromBirth/2) - daysSinceMeeting;
      }
      
      this.message = 'on ' + now.format('dddd, MMMM Do YYYY') + ' I have been alive ' + daysFromBirth + ' and have known you for ' + daysSinceMeeting;
      document.querySelector('#toastOK').show();
    }

  });
})();
