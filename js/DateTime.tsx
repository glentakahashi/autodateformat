///<reference path="../typings/react/react-global.d.ts" />
///<reference path="./interfaces.d.ts"/>
///<reference path='./SegmentType.tsx'/>
///<reference path='./SegmentView.tsx'/>
///<reference path='./Segment.tsx'/>
///<reference path='./DateFormat.tsx'/>
///<reference path='./dateformats/bashdateformat.ts'/>
///<reference path='./dateformats/mysqldateformat.ts'/>
///<reference path='./dateformats/postgresdateformat.ts'/>
///<reference path='./dateformats/javadateformat.ts'/>

let DATEFORMATS: (typeof DateFormat)[] = [
  PostgresDateFormat,
  JavaDateFormat,
  MySQLDateFormat,
  BashDateFormat
];

class DateTime extends React.Component<IDateTimeProps, {}> {
  private static dateSeparators: string[] = ["-", "/", "."];

  constructor(props: IDateTimeProps) {
    super(props);
  }

  private getSegments(datetimeString: string) {
    // Tokens are whitespace, words, numbers, or other
    let tokens: string[] = this.props.datetimeString.match(/([^a-zA-Z\s\d]+|\d+|\s+|[a-zA-Z]+)/g);
    let segments = [];
    for (let i: number = 0; i < tokens.length; i++) {
      segments.push(new Segment(tokens[i]));
    }
    this.consolidateSegmentTypes(segments);
    return segments;
  }

  public render() {
    let segments = this.getSegments(this.props.datetimeString);
    function buildSegmentView(segment) {
      return <SegmentView segment={segment}/>;
    }
    function buildDateFormats(dateformat) {
      return React.createElement(dateformat, {segments: segments});
    }
    return (
      <div>
        <div>
          {DATEFORMATS.map(buildDateFormats)}
        </div>
        <div>
          {segments.map(buildSegmentView)}
        </div>
      </div>
    );
  }

  private disableAllOfSegmentType(segments: Segment[], segmentType: typeof SegmentType): boolean {
    let changed: boolean = false;
    for (let i: number = 0; i < segments.length; i++) {
      if (segments[i].numTypes() > 1) {
        if (segments[i].has(segmentType) && segments[i].hasEnabled(segmentType)) {
          changed = true;
        }
        segments[i].disableType(segmentType);
      }
    }
    return changed;
  }

  private consolidateSegmentTypes(segments: Segment[]): void {
    for (let i: number = 0; i < segments.length; i++) {
      let segment: Segment = segments[i];

      // if we find an ampm, set all hour segments to non-24 hour period
      if (segment.has(AMPMSegmentType)) {
        for (let j: number = 0; j < segments.length; j++) {
          if (segments[j].has(HourSegmentType)) {
            (segments[j].getType(HourSegmentType) as HourSegmentType).setTwentyFour(false);
          }
        }
      }

      // join date_ending with date to get a formatted date
      if (i + 1 < segments.length && segment.has(DaySegmentType) && DaySegmentType.date_endings.indexOf(segments[i + 1].getToken().toLowerCase()) !== -1) {
        segments.splice(i, 2, new Segment(segment.getToken() + segments[i + 1].getToken()));
        continue;
      }

      // assume Epoch is either everything or nothing
      if (segment.has(EpochSegmentType) && segments.length > 1) {
        segment.disableType(EpochSegmentType);
      } else if (segment.has(EpochSegmentType)) {
        segment.setType(EpochSegmentType);
      }

      // Parse +XX:XX:XX through -XXXX timezone segments
      if (segment.getToken() === "-" || segment.getToken() === "+") {
        // +-XXXX
        if (i + 1 < segments.length && segments[i + 1].has(HourMinuteSegmentType)) {
          segments.splice(i, 2, new Segment(segment.getToken() + segments[i + 1].getToken()));
          continue;
        }
        // +-XX
        if (i + 1 < segments.length && segments[i + 1].has(HourSegmentType)) {
          // +-XX:XX
          if (i + 3 < segments.length && segments[i + 2].getToken() === ":" && segments[i + 3].has(MinuteSegmentType)) {
            // +-XX:XX:XX
            if (i + 5 < segments.length && segments[i + 4].getToken() === ":" && segments[i + 5].has(SecondSegmentType)) {
              segments.splice(i, 6, new Segment(segment.getToken() + segments[i + 1].getToken() + ":" + segments[i + 3].getToken() + ":" + segments[i + 5].getToken()));
              continue;
            } else {
              segments.splice(i, 4, new Segment(segment.getToken() + segments[i + 1].getToken() + ":" + segments[i + 3].getToken()));
              continue;
            }
          } else {
            segments.splice(i, 2, new Segment(segment.getToken() + segments[i + 1].getToken()));
            continue;
          }
        }
        // This has to be at the bottom because everything that matches against millisecond also matches against second
        // +-XXXXXX
        if (i + 1 < segments.length && segments[i + 1].has(HourMinuteSecondSegmentType)) {
          segments.splice(i, 2, new Segment(segment.getToken() + segments[i + 1].getToken()));
          continue;
        }
      }

      // Consolidate month/day/year and day/month/year fragments
      if ((segment.has(MonthSegmentType) || segment.has(DaySegmentType)) && i + 2 < segments.length && DateTime.dateSeparators.indexOf(segments[i + 1].getToken()) !== -1
          && (segments[i + 2].has(DaySegmentType) || segments[i + 2].has(MonthSegmentType))) {
        let j = i;
        if (i + 4 < segments.length  && DateTime.dateSeparators.indexOf(segments[i + 3].getToken()) !== -1 && (segments[i + 4].has(YearSegmentType) || segments[i + 4].has(ShortYearSegmentType))) {
          this.disableAllOfSegmentType(segments, YearSegmentType);
          this.disableAllOfSegmentType(segments, ShortYearSegmentType);
          segments[i + 4].setTypes([YearSegmentType, ShortYearSegmentType]);
          j += 2;
        }
        this.disableAllOfSegmentType(segments, MonthSegmentType);
        this.disableAllOfSegmentType(segments, DaySegmentType);
        if (!segment.has(MonthSegmentType)) {
          segment.setType(DaySegmentType);
          segments[i + 2].setType(MonthSegmentType);
        } else if (!segments[i + 2].has(MonthSegmentType)) {
          segment.setType(MonthSegmentType);
          segments[i + 2].setType(DaySegmentType);
        } else {
          segment.setTypes([MonthSegmentType, DaySegmentType]);
          segments[i + 2].setTypes([MonthSegmentType, DaySegmentType]);
        }
        i = j + 2;
        continue;
      }

      // Consolidate year/month/day fragment
      // nobody uses year/day/month practically
      if (segment.has(YearSegmentType) && i + 4 < segments.length
          && DateTime.dateSeparators.indexOf(segments[i + 1].getToken()) !== -1 && segments[i + 2].has(MonthSegmentType)
          && DateTime.dateSeparators.indexOf(segments[i + 3].getToken()) !== -1 && segments[i + 4].has(DaySegmentType)) {
        this.disableAllOfSegmentType(segments, MonthSegmentType);
        this.disableAllOfSegmentType(segments, DaySegmentType);
        this.disableAllOfSegmentType(segments, YearSegmentType);
        segments[i + 2].setType(MonthSegmentType);
        segments[i + 4].setType(DaySegmentType);
        segment.setType(YearSegmentType);
        i += 4;
        continue;
      }

      // this has to come after month.day.year parsing or dates will be parsed as seconds.milliseconds
      // Consolidate hour:minute(:second) fragments
      if (segment.has(HourSegmentType) && i + 2 < segments.length && segments[i + 1].getToken() === ":" && segments[i + 2].has(MinuteSegmentType)) {
        let j = i;
        if (i + 4 < segments.length && segments[i + 3].getToken() === ":" && segments[i + 4].has(SecondSegmentType)) {
          this.disableAllOfSegmentType(segments, SecondSegmentType);
          segments[i + 4].setType(SecondSegmentType);
          // don't skip over second so we can process second.milliseconds
          j += 1;
        }
        this.disableAllOfSegmentType(segments, HourMinuteSegmentType);
        this.disableAllOfSegmentType(segments, HourSegmentType);
        this.disableAllOfSegmentType(segments, MinuteSegmentType);
        segment.setType(HourSegmentType);
        segments[i + 2].setType(MinuteSegmentType);
        i = j + 2;
        continue;
      }

      // Second.milliseconds
      if (segment.has(SecondSegmentType) && i + 2 < segments.length && segments[i + 1].getToken() === "." && segments[i + 2].has(MillisecondSegmentType)) {
        this.disableAllOfSegmentType(segments, SecondSegmentType);
        this.disableAllOfSegmentType(segments, MillisecondSegmentType);
        segment.setType(SecondSegmentType);
        segments[i + 2].setType(MillisecondSegmentType);
        i += 2;
        continue;
      }

      // Because the previous section should skip over milliseconds if it finds them, ignore milliseconds here as they are probably erroneous
      if (segment.has(MillisecondSegmentType)) {
        segment.disableType(MillisecondSegmentType);
      }
    }

    // Remove fill if there are other types
    for (let i: number = 0; i < segments.length; i++) {
      if (segments[i].has(FillSegmentType) && segments[i].numTypes() > 1) {
        segments[i].disableType(FillSegmentType);
      }
    }

    // if we find any one of the following alone, remove all equivalent types (including itself) from other segments if it won"t leave them empty
    // repeat until no more changes
    let segmentTypeEquivalences: (typeof SegmentType)[][] = [
      [YearSegmentType, ShortYearSegmentType],
      [LongMonthSegmentType, ShortMonthSegmentType, MonthSegmentType],
      [LongDaySegmentType, ShortDaySegmentType],
      [HourSegmentType, HourMinuteSegmentType, HourMinuteSecondSegmentType],
      [MinuteSegmentType, HourMinuteSegmentType, HourMinuteSecondSegmentType],
      [SecondSegmentType, HourMinuteSecondSegmentType],
      [LongTimezoneSegmentType, ShortTimezoneSegmentType, TimezoneOffsetSegmentType]
    ];

    // add singleton equivalence classes everywhere
    for (let i: number = 0; i < segmentTypes.length; i++) {
      segmentTypeEquivalences.unshift([segmentTypes[i]]);
    }

    let changed: boolean = true;
    while (changed) {
      changed = false;
      for (let i: number = 0; i < segments.length; i++) {
        let onlySegmentType: SegmentType = segments[i].getOnlySegmentType();
        if (onlySegmentType !== null) {
          for (let j: number = 0; j < segmentTypeEquivalences.length; j++) {
            for (let k: number = 0; k < segmentTypeEquivalences[j].length; k++) {
              if (onlySegmentType instanceof segmentTypeEquivalences[j][k]) {
                for (let l: number = 0; l < segmentTypeEquivalences[j].length; l++) {
                  changed = changed || this.disableAllOfSegmentType(segments, segmentTypeEquivalences[j][l]);
                }
              }
            }
          }
        }
      }
    }
  }
}
