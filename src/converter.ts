var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
var short_days = ['mon', 'tues', 'tue', 'wed', 'thu', 'thurs', 'fri', 'sat', 'sun'];
var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
var short_months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'sept', 'oct', 'nov', 'dec'];
var ampm = ['am', 'a', 'pm', 'p'];

var skips = [' ', '.', ',', ';', '-', '/', "'", 'at', 'on', 'and', 'ad', 'm', 't', 'of', 'st', 'nd', 'rd', 'th'];

var types = Object.freeze({
  SHORT_DAY: 0,
  LONG_DAY: 1,
  SHORT_MONTH: 2,
  LONG_MONTH: 3,
  DAY: 4,
  MONTH: 5,
  YEAR: 6,
  SHORT_YEAR: 6,
  HOUR: 7,
  MINUTE: 8,
  SECOND: 9,
  NANOSECOND: 10,
  AMPM: 11,
  TIMEZONE: 12,
  EPOCH: 13,
  FILL: 14
});

var convertDateBash = function(segments) {
  var string = "";
  var segment;
  for(i in segments) {
    segment = segments[i];
    switch(segment.type) {
      case types.SHORT_DAY:
        break;
      case types.LONG_DAY:
        break;
      case types.SHORT_MONTH:
        break;
      case types.LONG_MONTH:
        break;
      case types.DAY:
        break;
      case types.MONTH:
        break;
      case types.YEAR:
        break;
      case types.SHORT_YEAR:
        break;
      case types.HOUR:
        break;
      case types.MINUTE:
        break;
      case types.SECOND:
        break;
      case types.NANOSECOND:
        break;
      case types.AMPM:
        break;
      case types.AMPM:
        break;
      case types.FILL:
        string += segment.replace('%','%%');
        break;
    }
  }
}

var convertDateJava = function(segments) {
}

var outputs = {'bash': convertDateBash, 'java': convertDateJava};

$(window).ready(function() {
  $('#convert').click(function() {
    //steps
    //split into segments
    var date = $('#date').val();
    parsedDate = parseDate(date);
    console.log(parsedDate);
    var convertedDates = convertDate(parsedDate);
    console.log(convertedDates);
  });
});

var convertDate = function(segments) {
  var convertedDates = {};
  for(j in outputs) {
    convertedDates[j] = outputs[j](segments);
  }
  return convertedDates;
}

var isNum = function(str) {
  return !isNaN(parseFloat(str));
}

var parseDate = function(date) {
  var tokens = date.match(/([^\w\s]+|\s+|\w+)/g);
  var segments = [];
  if(tokens.length == 1 && isNum(tokens[0])) {
    if(tokens[0][0] == '0') {
      segments.push([{type: types.DAY}]);
    } else {
      segments.push([{type: types.EPOCH}]);
    }
    return segments;
  }
  var curr_segment = 0;
  for(i in tokens) {
    token = tokens[i];
    if(days.indexOf(token.toLowerCase()) > -1) {
      segments.push({type: types.DAY, case: getCase(token)});
    } else if(short_days.indexOf(token.toLowerCase()) > -1) {
      segments.push({type: types.SHORT_DAY, case: getCase(token)});
    } else if(months.indexOf(token.toLowerCase()) > -1) {
      segments.push({type: types.MONTH, case: getCase(token)});
    } else if(short_months.indexOf(token.toLowerCase()) > -1) {
      segments.push({type: types.SHORT_MONTH, case: getCase(token)});
    } else if(ampm.indexOf(token.toLowerCase()) > -1) {
      segments.push({type: types.AMPM, case: getCase(token)});
    }
  }
}

var getCase = function(string) {
  if(string == string.toUpperCase()) {
    return 'u';
  } else if (string == string.toLowerCase()) {
    return 'l';
  } else {
    return 's';
  }
}
