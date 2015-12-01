///<reference path='jquery.d.ts'/>
///<reference path='segments.ts'/>
//dateformats: DateFormat[] = [BashDateFormat, JavaDateFormat];

$(window).ready(function() {
  var testDates: string[] = [
    "Sun, 29 Feb 2004 16:21:42 -0800",
    "Wednesday 16th October 2013 19:00 CET",
    "Sunday, 29 February 2004 16:21:42 -0800",
    "2004-02-29 16:21:42",
    "1997-07-16T19:20:30+01:00",
    "1997-07-16T19:20:30",
    "1997-07-16T19:20+01:00",
    "1997-07-16T19:20",
    "1997-07-07T19:20:30+01:00",
    "1997-07-07T192030+01:00",
    "1997-07-07T192030+0100",
    "1997-07-07 192030+0100",
    "11/11/11",
    "11/11/2011",
    "11.11.2011",
    "11/11/2011 01:03:45.1203",
    "11/11/2011 01:03:45.1203Z",
    "11/11/2011 01:03:45.1203 GMT",
    "10230810",
  ];
  var tests: any = $("#tests");
  for(var k: number = 0; k<testDates.length; k++) {
    var ele: any = $("<div class='segment'></div>");
    ele.html(testDates[k] + "<br>");
    var segments: Segment[] = parseDate(testDates[k]);
    segments = consolidateSegmentTypes(segments);
    for(var i: number = 0; i<segments.length; i++) {
      ele.html(ele.html() + segments[i] + "<br>");
    }
    ele.html(ele.html() + "<br><br><br><br>");
    tests.append(ele);
  }

  $('.btn').click(function(ev: JQueryEventObject) {
    var date: string = $(this).parent().children().first().val();
    var segments: Segment[] = parseDate(date);
    segments = consolidateSegmentTypes(segments);
    for(var i: number = 0; i<segments.length; i++) {
      console.log(segments[i]);
    }
    //console.log(segments);
    //parsedDate = parseDate(date);
    //console.log(parsedDate);
    //var convertedDates = convertDate(parsedDate);
    //console.log(convertedDates);
  });
});

//function convertDate(segments: SegmentType[]) {
  //var convertedDates = {};
  //for(j in outputs) {
    //convertedDates[j] = outputs[j](segments);
  //}
  //return convertedDates;
//}

function parseDate(date: string): Segment[] {
  //Tokens are whitespace, words, numbers, or other
  console.log(date);
  var tokens: string[] = date.match(/([^a-zA-Z\s\d]+|\d+|\s+|[a-zA-Z]+)/g);
  console.log(tokens);
  var segments: Segment[] = [];
  for(var i: number = 0; i < tokens.length; i++) {
    segments.push(new Segment(tokens[i]));
  }
  return segments;
}


function disableAllOfSegmentType(segments: Segment[], segmentType: typeof SegmentType): boolean {
  var changed: boolean = false;
  for(var i: number = 0; i<segments.length; i++) {
    if(segments[i].numTypes() > 1) {
      if(segments[i].has(segmentType) && segments[i].hasEnabled(segmentType)) {
        changed = true;
      }
      segments[i].disableType(segmentType);
    }
  }
  return changed;
}

var dateSeparators: string[] = ['-', '/', '.'];

function consolidateSegmentTypes(segments: Segment[]): Segment[] {
  for(var i: number = 0; i<segments.length; i++) {
    var segment: Segment = segments[i];

    //if we find an ampm, set all hour segments to non-24 hour period
    if(segment.has(AMPMSegmentType)) {
      for(var j: number = 0; j<segments.length; j++) {
        if(segments[j].has(HourSegmentType)) {
          (<HourSegmentType>segments[j].getType(HourSegmentType)).setTwentyFour(false);
        }
      }
    }

    //join date_ending with date to get a formatted date
    if(i+1 < segments.length && segment.has(DaySegmentType) && DaySegmentType.date_endings.indexOf(segments[i+1].getToken().toLowerCase()) != -1) {
      segments.splice(i,2,new Segment(segment.getToken() + segments[i+1].getToken()));
      continue;
    }

    //assume Epoch is either everything or nothing
    if(segment.has(EpochSegmentType) && segments.length > 1) {
      segment.disableType(EpochSegmentType);
    } else if (segment.has(EpochSegmentType)) {
      segment.setType(EpochSegmentType);
    }

    //Parse +XX:XX:XX through -XXXX timezone segments
    if(segment.getToken() == '-' || segment.getToken() == '+') {
      //+-XXXX
      if(i+1 < segments.length && segments[i+1].has(HourMinuteSegmentType)) {
        segments.splice(i,2,new Segment(segment.getToken() + segments[i+1].getToken()));
        continue;
      }
      //+-XX
      if(i+1 < segments.length && segments[i+1].has(HourSegmentType)) {
        //+-XX:XX
        if(i+3 < segments.length && segments[i+2].getToken() == ':' && segments[i+3].has(MinuteSegmentType)) {
          //+-XX:XX:XX
          if(i+5 < segments.length && segments[i+4].getToken() == ':' && segments[i+5].has(SecondSegmentType)) {
            segments.splice(i,6,new Segment(segment.getToken() + segments[i+1].getToken() + ":" + segments[i+3].getToken() + ":" + segments[i+5].getToken()));
            continue;
          } else {
            segments.splice(i,4,new Segment(segment.getToken() + segments[i+1].getToken() + ":" + segments[i+3].getToken()));
            continue;
          }
        } else {
          segments.splice(i,2,new Segment(segment.getToken() + segments[i+1].getToken()));
          continue;
        }
      }
      //This has to be at the bottom because everything that matches against millisecond also matches against second
      //+-XXXXXX
      if(i+1 < segments.length && segments[i+1].has(HourMinuteSecondSegmentType)) {
        segments.splice(i,2,new Segment(segment.getToken() + segments[i+1].getToken()));
        continue;
      }
    }

    //Consolidate month/day/year and day/month/year fragments
    if((segment.has(MonthSegmentType) || segment.has(DaySegmentType)) && i+2 < segments.length && dateSeparators.indexOf(segments[i+1].getToken()) != -1
        && (segments[i+2].has(DaySegmentType) || segments[i+2].has(MonthSegmentType))) {
      var j = i;
      if(i+4 < segments.length  && dateSeparators.indexOf(segments[i+3].getToken()) != -1 && (segments[i+4].has(YearSegmentType) || segments[i+4].has(ShortYearSegmentType))) {
        disableAllOfSegmentType(segments, YearSegmentType);
        disableAllOfSegmentType(segments, ShortYearSegmentType);
        segments[i+4].setTypes([YearSegmentType, ShortYearSegmentType]);
        j += 2;
      }
      disableAllOfSegmentType(segments, MonthSegmentType);
      disableAllOfSegmentType(segments, DaySegmentType);
      if(!segment.has(MonthSegmentType)) {
        segment.setType(DaySegmentType);
        segments[i+2].setType(MonthSegmentType);
      } else if (!segments[i+2].has(MonthSegmentType)) {
        segment.setType(MonthSegmentType);
        segments[i+2].setType(DaySegmentType);
      } else {
        segment.setTypes([MonthSegmentType, DaySegmentType]);
        segments[i+2].setTypes([MonthSegmentType, DaySegmentType]);
      }
      i = j + 2;
      continue;
    }

    //Consolidate year/month/day fragment
    //nobody uses year/day/month practically
    if(segment.has(YearSegmentType) && i+4 < segments.length
        && dateSeparators.indexOf(segments[i+1].getToken()) != -1 && segments[i+2].has(MonthSegmentType)
        && dateSeparators.indexOf(segments[i+3].getToken()) != -1 && segments[i+4].has(DaySegmentType)) {
      disableAllOfSegmentType(segments, MonthSegmentType);
      disableAllOfSegmentType(segments, DaySegmentType);
      disableAllOfSegmentType(segments, YearSegmentType);
      segments[i+2].setType(MonthSegmentType);
      segments[i+4].setType(DaySegmentType);
      segment.setType(YearSegmentType);
      i += 4;
      continue;
    }

    //this has to come after month.day.year parsing or dates will be parsed as seconds.milliseconds
    //Consolidate hour:minute(:second) fragments
    if(segment.has(HourSegmentType) && i+2 < segments.length && segments[i+1].getToken() == ':' && segments[i+2].has(MinuteSegmentType)) {
      var j = i;
      if(i+4 < segments.length && segments[i+3].getToken() == ':' && segments[i+4].has(SecondSegmentType)) {
        disableAllOfSegmentType(segments, SecondSegmentType);
        segments[i+4].setType(SecondSegmentType);
        //don't skip over second so we can process second.milliseconds
        j += 1;
      }
      disableAllOfSegmentType(segments, HourMinuteSegmentType);
      disableAllOfSegmentType(segments, HourSegmentType);
      disableAllOfSegmentType(segments, MinuteSegmentType);
      segment.setType(HourSegmentType);
      segments[i+2].setType(MinuteSegmentType);
      i = j + 2;
      continue;
    }

    //Second.milliseconds
    if(segment.has(SecondSegmentType) && i+2 < segments.length && segments[i+1].getToken() == '.' && segments[i+2].has(MillisecondSegmentType)) {
      disableAllOfSegmentType(segments, SecondSegmentType);
      disableAllOfSegmentType(segments, MillisecondSegmentType);
      segment.setType(SecondSegmentType);
      segments[i+2].setType(MillisecondSegmentType);
      i += 2;
      continue;
    }

    //Because the previous section should skip over milliseconds if it finds them, ignore milliseconds here as they are probably erroneous
    if(segment.has(MillisecondSegmentType)) {
      segment.disableType(MillisecondSegmentType);
    }
  }

  //Remove fill if there are other types
  for(var i: number = 0; i<segments.length; i++) {
    if(segments[i].has(FillSegmentType) && segments[i].numTypes() > 1) {
      segments[i].disableType(FillSegmentType);
    }
  }

  //if we find any one of the following alone, remove all equivalent types (including itself) from other segments if it won't leave them empty
  //repeat until no more changes
  var segmentTypeEquivalences: (typeof SegmentType)[][] = [
    [YearSegmentType, ShortYearSegmentType],
    [LongMonthSegmentType, ShortMonthSegmentType, MonthSegmentType],
    [LongDaySegmentType, ShortDaySegmentType],
    [HourSegmentType, HourMinuteSegmentType, HourMinuteSecondSegmentType],
    [MinuteSegmentType, HourMinuteSegmentType, HourMinuteSecondSegmentType],
    [SecondSegmentType, HourMinuteSecondSegmentType],
    [LongTimezoneSegmentType, ShortTimezoneSegmentType, TimezoneOffsetSegmentType]
  ];

  //add singleton equivalence classes everywhere
  for(var i: number = 0; i<segmentTypes.length; i++) {
    segmentTypeEquivalences.unshift([segmentTypes[i]]);
  }

  var changed: boolean = true;
  while(changed) {
    changed = false;
    for(var i: number = 0; i<segments.length; i++) {
      var onlySegmentType: SegmentType = segments[i].getOnlySegmentType();
      if(onlySegmentType != null) {
        for(var j: number = 0; j<segmentTypeEquivalences.length; j++) {
          for(var k: number = 0; k<segmentTypeEquivalences[j].length; k++) {
            if(onlySegmentType instanceof segmentTypeEquivalences[j][k]) {
              for(var l: number = 0; l<segmentTypeEquivalences[j].length; l++) {
                changed = changed || disableAllOfSegmentType(segments, segmentTypeEquivalences[j][l]);
              }
            }
          }
        }
      }
    }
  }
  return segments;
}
