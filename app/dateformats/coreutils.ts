import {DateFormat} from './dateformat';
import {DateFormatSegment, DateFormatSegmentStatus} from './dateformat-segment';
import {Segment} from '../segment';
import {
  CaseStyle, TimezoneOffsetType, StringSegmentType,
  ShortDaySegmentType, LongDaySegmentType,
  ShortMonthSegmentType, LongMonthSegmentType, DaySegmentType,
  MonthSegmentType, YearSegmentType, YearMonthDaySegmentType, ShortYearSegmentType,
  YearMonthDayHourMinuteSegmentType, YearMonthDayHourMinuteSecondSegmentType,
  HourMinuteSegmentType, HourMinuteSecondSegmentType, HourSegmentType,
  MinuteSegmentType, SecondSegmentType, MillisecondSegmentType,
  AMPMSegmentType, ShortTimezoneSegmentType, LongTimezoneSegmentType,
  TimezoneOffsetSegmentType, EpochSegmentType, FillSegmentType,
} from '../segment-type';

export class CoreutilsDateFormat extends DateFormat {
  public getLabel(): string {
    return "Coreutils Date";
  }

  public getFormat(): DateFormatSegment[] {
    let format: DateFormatSegment[] = [];
    let segments: Segment[] = this.datetime.getSegments();
    let segmentType;
    for (let i = 0; i < segments.length; i++) {
      let segment = segments[i];
      switch (segment.getSelected()) {
        case ShortDaySegmentType:
          segmentType = segment.getType(segment.getSelected()) as ShortDaySegmentType;
          format.push(this.getCasedSegmentType(segmentType, "a", ""));
          break;
        case LongDaySegmentType:
          segmentType = segment.getType(segment.getSelected()) as LongDaySegmentType;
          format.push(this.getCasedSegmentType(segmentType, "A", ""));
          break;
        case ShortMonthSegmentType:
          segmentType = segment.getType(segment.getSelected()) as ShortMonthSegmentType;
          format.push(this.getCasedSegmentType(segmentType, "b", ""));
          break;
        case LongMonthSegmentType:
          segmentType = segment.getType(segment.getSelected()) as LongMonthSegmentType;
          format.push(this.getCasedSegmentType(segmentType, "B", ""));
          break;
        case DaySegmentType:
          segmentType = segment.getType(segment.getSelected()) as DaySegmentType;
          let tooltip = null;
          let stat = DateFormatSegmentStatus.OKAY;
          if (segmentType.isPrettyEnding()) {
            tooltip = "Coreutils Bash does not support st, nd, rd, th.";
            stat = DateFormatSegmentStatus.ERROR;
          }
          if (segmentType.isZeroPadded()) {
            format.push(new DateFormatSegment("%d", stat, tooltip));
          } else {
            format.push(new DateFormatSegment("%-d", stat, tooltip));
          }
          break;
        case MonthSegmentType:
          segmentType = segment.getType(segment.getSelected()) as MonthSegmentType;
          if (segmentType.isZeroPadded()) {
            format.push(new DateFormatSegment("%m", DateFormatSegmentStatus.OKAY, null));
          } else {
            format.push(new DateFormatSegment("%-m", DateFormatSegmentStatus.OKAY, null));
          }
          break;
        case YearSegmentType:
          segmentType = segment.getType(segment.getSelected()) as YearSegmentType;
          if (segmentType.isZeroPadded()) {
            format.push(new DateFormatSegment("%Y", DateFormatSegmentStatus.OKAY, null));
          } else {
            format.push(new DateFormatSegment("%-Y", DateFormatSegmentStatus.OKAY, null));
          }
          break;
        case YearMonthDaySegmentType:
          segmentType = segment.getType(segment.getSelected()) as YearSegmentType;
          format.push(new DateFormatSegment("%Y%m%d", DateFormatSegmentStatus.OKAY, null));
          break;
        case YearMonthDayHourMinuteSegmentType:
          segmentType = segment.getType(segment.getSelected()) as YearSegmentType;
          format.push(new DateFormatSegment("%Y%m%d%H%M", DateFormatSegmentStatus.OKAY, null));
          break;
        case YearMonthDayHourMinuteSecondSegmentType:
          segmentType = segment.getType(segment.getSelected()) as YearSegmentType;
          format.push(new DateFormatSegment("%Y%m%d%H%M%S", DateFormatSegmentStatus.OKAY, null));
          break;
        case ShortYearSegmentType:
          segmentType = segment.getType(segment.getSelected()) as ShortYearSegmentType;
          if (segmentType.isZeroPadded()) {
            format.push(new DateFormatSegment("%y", DateFormatSegmentStatus.OKAY, null));
          } else {
            format.push(new DateFormatSegment("%-y", DateFormatSegmentStatus.OKAY, null));
          }
          break;
        case HourMinuteSegmentType:
          segmentType = segment.getType(segment.getSelected()) as HourMinuteSegmentType;
          format.push(new DateFormatSegment("%H%M", DateFormatSegmentStatus.OKAY, null));
          break;
        case HourMinuteSecondSegmentType:
          segmentType = segment.getType(segment.getSelected()) as HourMinuteSecondSegmentType;
          format.push(new DateFormatSegment("%H%M%S", DateFormatSegmentStatus.OKAY, null));
          break;
        case HourSegmentType:
          segmentType = segment.getType(segment.getSelected()) as HourSegmentType;
          if (segmentType.getTwentyFour()) {
            if (segmentType.isZeroPadded()) {
              format.push(new DateFormatSegment("%H", DateFormatSegmentStatus.OKAY, null));
            } else {
              format.push(new DateFormatSegment("%-H", DateFormatSegmentStatus.OKAY, null));
            }
          } else {
            if (segmentType.isZeroPadded()) {
              format.push(new DateFormatSegment("%I", DateFormatSegmentStatus.OKAY, null));
            } else {
              format.push(new DateFormatSegment("%-I", DateFormatSegmentStatus.OKAY, null));
            }
          }
          break;
        case MinuteSegmentType:
          segmentType = segment.getType(segment.getSelected()) as MinuteSegmentType;
          if (segmentType.isZeroPadded()) {
            format.push(new DateFormatSegment("%M", DateFormatSegmentStatus.OKAY, null));
          } else {
            format.push(new DateFormatSegment("%-M", DateFormatSegmentStatus.OKAY, null));
          }
          break;
        case SecondSegmentType:
          segmentType = segment.getType(segment.getSelected()) as SecondSegmentType;
          if (segmentType.isZeroPadded()) {
            format.push(new DateFormatSegment("%S", DateFormatSegmentStatus.OKAY, null));
          } else {
            format.push(new DateFormatSegment("%-S", DateFormatSegmentStatus.OKAY, null));
          }
          break;
        case MillisecondSegmentType:
          segmentType = segment.getType(segment.getSelected()) as MillisecondSegmentType;
          format.push(new DateFormatSegment("%N", DateFormatSegmentStatus.OKAY, null));
          break;
        case AMPMSegmentType:
          segmentType = segment.getType(segment.getSelected()) as AMPMSegmentType;
          switch (segmentType.getCaseStyle()) {
            case CaseStyle.Upper:
              format.push(new DateFormatSegment("%p", DateFormatSegmentStatus.OKAY, null));
              break;
            default:
              format.push(new DateFormatSegment("%P", DateFormatSegmentStatus.OKAY, null));
              break;
          }
          break;
        case ShortTimezoneSegmentType:
          segmentType = segment.getType(segment.getSelected()) as ShortTimezoneSegmentType;
          format.push(new DateFormatSegment("%Z", DateFormatSegmentStatus.OKAY, null));
          break;
        case LongTimezoneSegmentType:
          segmentType = segment.getType(segment.getSelected()) as LongTimezoneSegmentType;
          format.push(new DateFormatSegment(segmentType.getSettings().get('token').getValue().replace('%', '%%'), DateFormatSegmentStatus.ERROR, "Coreutils Date does not support Long Timezones"));
          break;
        case TimezoneOffsetSegmentType:
          segmentType = segment.getType(segment.getSelected()) as TimezoneOffsetSegmentType;
          switch (segmentType.getTimezoneOffsetType()) {
            case TimezoneOffsetType.Hour:
              format.push(new DateFormatSegment("%:::z", DateFormatSegmentStatus.WARN, "This mode specifies to necessary precision. Coreutils Date does not have a way of forcing only hour."));
              break;
            case TimezoneOffsetType.HourMinute:
              format.push(new DateFormatSegment("%z", DateFormatSegmentStatus.OKAY, null));
              break;
            case TimezoneOffsetType.HourMinuteSecond:
              format.push(new DateFormatSegment("%::z", DateFormatSegmentStatus.ERROR, "There is no way to specify hour-minute-second without separators in bash"));
              break;
            case TimezoneOffsetType.HourMinuteSeparated:
              format.push(new DateFormatSegment("%:z", DateFormatSegmentStatus.OKAY, null));
              break;
            case TimezoneOffsetType.HourMinuteSecondSeparated:
              format.push(new DateFormatSegment("%::z", DateFormatSegmentStatus.OKAY, null));
              break;
          }
          break;
        case EpochSegmentType:
          segmentType = segment.getType(segment.getSelected()) as EpochSegmentType;
          format.push(new DateFormatSegment("%s", DateFormatSegmentStatus.OKAY, null));
          break;
        case FillSegmentType:
          segmentType = segment.getType(segment.getSelected()) as FillSegmentType;
          format.push(new DateFormatSegment(segmentType.getSettings().get('token').getValue().replace('%', '%%'), DateFormatSegmentStatus.OKAY, null));
          break;
        default:
          throw new Error("Unhandled SegmentType (" + segment.getSelected().name +  ") Encountered for type: " + this.getLabel());
      }
    }
    return format;
  }

  public getFormatString(): string {
    let format = this.getFormat();
    let formatString = "";
    for (let i in format) {
      formatString += format[i].getValue();
    }
    return formatString;
  }

  public getExample(): string {
    return "`date '+" + this.getFormatString() + "'`";
  }

  private getCasedSegmentType(segmentType: StringSegmentType, formatString: string, extraFormatters: string): DateFormatSegment {
    let format = "%" + extraFormatters;
    let stat = DateFormatSegmentStatus.OKAY;
    let tooltip = null;
    switch (segmentType.getCaseStyle()) {
      case CaseStyle.Upper:
        format += "^";
        break;
      case CaseStyle.Lower:
        stat = DateFormatSegmentStatus.ERROR;
        tooltip = "Coreutils Date does not have an option for lowercase.";
        break;
      case CaseStyle.Unknown:
        stat = DateFormatSegmentStatus.ERROR;
        tooltip = "An unknown CaseStyle was specified.";
        break;
      case CaseStyle.Title:
        break;
      default:
        break;
    }
    format += formatString + extraFormatters;
    return new DateFormatSegment(format, stat, tooltip);
  }
}
