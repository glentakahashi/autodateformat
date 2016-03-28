/* tslint:disable:max-line-length */
import {Segment} from './segment';
import {
  SegmentType, ShortDaySegmentType, LongDaySegmentType,
  ShortMonthSegmentType, LongMonthSegmentType, DaySegmentType,
  MonthSegmentType, YearSegmentType, ShortYearSegmentType,
  HourMinuteSegmentType, HourMinuteSecondSegmentType, HourSegmentType,
  MinuteSegmentType, SecondSegmentType, MillisecondSegmentType,
  AMPMSegmentType, ShortTimezoneSegmentType, LongTimezoneSegmentType,
  TimezoneOffsetSegmentType, EpochSegmentType, FillSegmentType,
  SEGMENT_TYPES,
} from './segment-type';

export class DateTime {
  private static DATE_SEPARATORS: string[] = ["-", "/", "."];

  private segments: Segment[];

  constructor(datetimeString: string) {
    this.segments = this.parseSegments(datetimeString);
    // Set the first one to be selected for each
    for (let i = 0; i < this.segments.length; i++) {
      let enabledTypes: SegmentType[] = this.segments[i].getEnabledTypes();
      if (enabledTypes.length > 0) {
        this.segments[i].setSelectedName(enabledTypes[0].getName());
      }
    }
  }

  public toString(): string {
    let str: string = "";
    for (let i = 0; i < this.segments.length; i++) {
      str += this.segments[i].getToken();
    }
    return str;
  }

  public getSegments(): Segment[] {
    return this.segments;
  }

  // TODO: is there a better way? Should I reuse the modals or create a new one every time... not sure
  public editSegment(segment: Segment) {
    let segmentId = this.segments.indexOf(segment);
    $('#edit-segment-modal input').val(segment.getToken());
    $('#edit-segment-modal .btn-primary').off('click');
    $('#edit-segment-modal .btn-primary').click(() => {
      let val = $('#edit-segment-modal input').val();
      let newSegment: Segment = new Segment(val);
      newSegment.setSelected(segment.getSelected());
      if (newSegment.getSelected() === null) {
        newSegment.setSelected(FillSegmentType);
      }
      this.segments.splice(segmentId, 1, newSegment);
      $('#edit-segment-modal').modal('hide');
    });
    $('#edit-segment-modal').modal();
  }

  public deleteSegment(segment: Segment) {
    let segmentId = this.segments.indexOf(segment);
    $('#delete-segment-modal .btn-primary').off('click');
    $('#delete-segment-modal .btn-primary').click(() => {
      this.segments.splice(segmentId, 1);
      $('#delete-segment-modal').modal('hide');
    });
    $('#delete-segment-modal').modal();
  }

  public newSegment(segment: Segment) {
    let segmentId = this.segments.indexOf(segment);
    $('#new-segment-modal input').val(segment.getToken());
    $('#new-segment-modal .btn-primary').off('click');
    $('#new-segment-modal .btn-primary').click(() => {
      let val = $('#new-segment-modal input').val();
      let newSegment: Segment = new Segment(val);
      newSegment.setSelected(FillSegmentType);
      this.segments.splice(segmentId + 1, 0, newSegment);
      $('#new-segment-modal').modal('hide');
    });
    $('#new-segment-modal').modal();
  }

  public joinSegments() {
    $('#join-segments-modal .segments').html('');
    $('#join-segments-modal .slider').html('');
    let start = Math.floor(this.segments.length / 2);
    let end = Math.floor(Math.min(this.segments.length - 1, this.segments.length / 2 + 1));
    let ele;
    for (let i = 0; i < this.segments.length; i++) {
      ele = $('<li>' + this.segments[i].getToken() + '</li>');
      if (i === start || i === end) {
        ele.addClass('joining');
      }
      $('#join-segments-modal .segments').append(ele);
    }
    $('#join-segments-modal .slider').slider({
      max: this.segments.length - 1,
      min: 0,
      range: true,
      slide: (e, ui) => {
        let lis = $('#join-segments-modal .segments li');
        lis.removeClass('joining');
        for (let i = ui.values[0]; i <= ui.values[1]; i++) {
          $(lis[i]).addClass('joining');
        }
      },
      values: [start, end],
    });
    $('#join-segments-modal .btn-primary').off('click');
    $('#join-segments-modal .btn-primary').click(() => {
      let range = $('#join-segments-modal .slider').slider('option', 'values');
      let token = '';
      for (let i = range[0]; i <= range[1]; i++) {
        token += this.segments[i].getToken();
      }
      let newSegment: Segment = new Segment(token);
      newSegment.setSelected(FillSegmentType);
      this.segments.splice(range[0],range[1]-range[0] + 1, newSegment);
      $('#join-segments-modal').modal('hide');
    });
    $('#join-segments-modal').modal();

  }

  public splitSegment(segment: Segment) {
    let segmentId = this.segments.indexOf(segment);
    let token: string = this.segments[segmentId].getToken();
    let newSegment: Segment;
    let newSegments: Segment[] = [];
    let ul = $('#split-segment-modal .characters');
    ul.html('');
    for (let i = 0; i < token.length; i++) {
      ul.append('<li>' + token[i] + '</li>');
      if (i != token.length -1) {
        ul.append('<input type="checkbox">');
      }
    }
    $('#split-segment-modal .btn-primary').off('click');
    $('#split-segment-modal .btn-primary').click(() => {
      let start = 0;
      let end = 0;
      let substringIndices: number[] = [];
      let checkboxes = $('#split-segment-modal .characters input');
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          substringIndices.push(i+1);
        }
      }
      for (let i in substringIndices) {
        end = substringIndices[i];
        if (end > token.length) {
          throw new Error("Tried to split on out of bounds");
        }
        newSegment = new Segment(token.substring(start, end));
        newSegment.setSelected(FillSegmentType);
        newSegments.push(newSegment);
        start = substringIndices[i];
      }
      if (start < token.length) {
        newSegment = new Segment(token.substring(start, token.length));
        newSegment.setSelected(FillSegmentType);
        newSegments.push(newSegment);
      }
      this.segments.splice(segmentId, 1);
      // XXX: FOR IN RETURNS A STRING???
      for (let i = 0; i < newSegments.length; i++) {
        this.segments.splice(segmentId + i, 0, newSegments[i]);
      }
      $('#split-segment-modal').modal('hide');
    });
    $('#split-segment-modal').modal();
  }

  private parseSegments(datetimeString: string) {
    // Tokens are whitespace, words, numbers, or other
    let tokens: string[] = datetimeString.match(/([^a-zA-Z\s\d]+|\d+|\s+|[a-zA-Z]+)/g);
    let segments = [];
    for (let i = 0; i < tokens.length; i++) {
      segments.push(new Segment(tokens[i]));
    }
    this.consolidateSegmentTypes(segments);
    return segments;
  }

  private disableAllOfSegmentType(segments: Segment[], segmentType: typeof SegmentType) {
    let changed = false;
    for (let i = 0; i < segments.length; i++) {
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
    for (let i = 0; i < segments.length; i++) {
      let segment: Segment = segments[i];

      // if we find an ampm, set all hour segments to non-24 hour period
      if (segment.has(AMPMSegmentType)) {
        for (let j = 0; j < segments.length; j++) {
          if (segments[j].has(HourSegmentType)) {
            (segments[j].getType(HourSegmentType) as HourSegmentType).setTwentyFour(false);
          }
        }
      }

      // join date_ending with date to get a formatted date
      if (i + 1 < segments.length && segment.has(DaySegmentType) && DaySegmentType.DATE_ENDINGS.indexOf(segments[i + 1].getToken().toLowerCase()) !== -1) {
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
      if ((segment.has(MonthSegmentType) || segment.has(DaySegmentType)) && i + 2 < segments.length && DateTime.DATE_SEPARATORS.indexOf(segments[i + 1].getToken()) !== -1
          && (segments[i + 2].has(DaySegmentType) || segments[i + 2].has(MonthSegmentType))) {
        let j = i;
        if (i + 4 < segments.length  && DateTime.DATE_SEPARATORS.indexOf(segments[i + 3].getToken()) !== -1 && (segments[i + 4].has(YearSegmentType) || segments[i + 4].has(ShortYearSegmentType))) {
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
          && DateTime.DATE_SEPARATORS.indexOf(segments[i + 1].getToken()) !== -1 && segments[i + 2].has(MonthSegmentType)
          && DateTime.DATE_SEPARATORS.indexOf(segments[i + 3].getToken()) !== -1 && segments[i + 4].has(DaySegmentType)) {
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

    for (let i = 0; i < segments.length; i++) {
      // Combine two fill if consecutive
      if (i + 1 < segments.length &&
          segments[i].getOnlySegmentType() !== null && segments[i].getOnlySegmentType().getName() === FillSegmentType.name &&
          segments[i + 1].getOnlySegmentType() !== null && segments[i + 1].getOnlySegmentType().getName() === FillSegmentType.name) {
        segments.splice(i, 2, new Segment(segments[i].getToken() + segments[i + 1].getToken()));
        i -= 1;
        continue;
      }

      // Remove fill if there are other types
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
      [LongTimezoneSegmentType, ShortTimezoneSegmentType, TimezoneOffsetSegmentType],
    ];

    // add singleton equivalence classes everywhere
    for (let i = 0; i < SEGMENT_TYPES.length; i++) {
      segmentTypeEquivalences.unshift([SEGMENT_TYPES[i]]);
    }

    let changed = true;
    while (changed) {
      changed = false;
      for (let i = 0; i < segments.length; i++) {
        let onlySegmentType: SegmentType = segments[i].getOnlySegmentType();
        if (onlySegmentType !== null) {
          for (let j = 0; j < segmentTypeEquivalences.length; j++) {
            for (let k = 0; k < segmentTypeEquivalences[j].length; k++) {
              if (onlySegmentType instanceof segmentTypeEquivalences[j][k]) {
                for (let l = 0; l < segmentTypeEquivalences[j].length; l++) {
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
