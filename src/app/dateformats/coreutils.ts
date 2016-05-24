import {DateFormat} from './dateformat';
import {DateFormatSegment, DateFormatSegmentStatus} from './dateformat-segment';
import {CaseStyle} from '../segment-type';

export class CoreutilsDateFormat extends DateFormat {
  public getLabel(): string {
    return "Coreutils Date";
  }

  public getShortDayFormat(caseStyle: CaseStyle): DateFormatSegment {
    return this.getCasedSegmentType(caseStyle, "a", "");
  }

  public getLongDayFormat(caseStyle: CaseStyle): DateFormatSegment {
    return this.getCasedSegmentType(caseStyle, "A", "");
  }

  public getShortMonthFormat(caseStyle: CaseStyle): DateFormatSegment {
    return this.getCasedSegmentType(caseStyle, "b", "");
  }

  public getLongMonthFormat(caseStyle: CaseStyle): DateFormatSegment {
    return this.getCasedSegmentType(caseStyle, "B", "");
  }

  public getDayFormat(caseStyle: CaseStyle, prettyEnding: boolean, zeroPadded: boolean): DateFormatSegment {
    let tooltip = null;
    let stat = DateFormatSegmentStatus.OKAY;
    if (prettyEnding) {
      tooltip = "Coreutils Bash does not support st, nd, rd, th.";
      stat = DateFormatSegmentStatus.ERROR;
    }
    if (zeroPadded) {
      return new DateFormatSegment("%d", stat, tooltip);
    } else {
      return new DateFormatSegment("%-d", stat, tooltip);
    }
  }

  public getMonthFormat(zeroPadded: boolean): DateFormatSegment {
    if (zeroPadded) {
      return new DateFormatSegment("%m", DateFormatSegmentStatus.OKAY, null);
    } else {
      return new DateFormatSegment("%-m", DateFormatSegmentStatus.OKAY, null);
    }
  }

  public getYearFormat(zeroPadded: boolean): DateFormatSegment {
    if (zeroPadded) {
      return new DateFormatSegment("%Y", DateFormatSegmentStatus.OKAY, null);
    } else {
      return new DateFormatSegment("%-Y", DateFormatSegmentStatus.OKAY, null);
    }
  }

  public getYearMonthDayFormat(): DateFormatSegment {
    return new DateFormatSegment("%Y%m%d", DateFormatSegmentStatus.OKAY, null);
  }

  public getYearMonthDayHourMinuteFormat(): DateFormatSegment {
    return new DateFormatSegment("%Y%m%d%H%M", DateFormatSegmentStatus.OKAY, null);
  }

  public getYearMonthDayHourMinuteSecondFormat(): DateFormatSegment {
    return new DateFormatSegment("%Y%m%d%H%M%S", DateFormatSegmentStatus.OKAY, null);
  }

  public getShortYearFormat(zeroPadded: boolean): DateFormatSegment {
    if (zeroPadded) {
      return new DateFormatSegment("%y", DateFormatSegmentStatus.OKAY, null);
    } else {
      return new DateFormatSegment("%-y", DateFormatSegmentStatus.OKAY, null);
    }
  }

  public getHourMinuteFormat(): DateFormatSegment {
    return new DateFormatSegment("%H%M", DateFormatSegmentStatus.OKAY, null);
  }

  public getHourMinuteSecondFormat(): DateFormatSegment {
    return new DateFormatSegment("%H%M%S", DateFormatSegmentStatus.OKAY, null);
  }

  public getHourFormat(twentyFourHour: boolean, zeroPadded: boolean): DateFormatSegment {
    if (twentyFourHour) {
      if (zeroPadded) {
        return new DateFormatSegment("%H", DateFormatSegmentStatus.OKAY, null);
      } else {
        return new DateFormatSegment("%-H", DateFormatSegmentStatus.OKAY, null);
      }
    } else {
      if (zeroPadded) {
        return new DateFormatSegment("%I", DateFormatSegmentStatus.OKAY, null);
      } else {
        return new DateFormatSegment("%-I", DateFormatSegmentStatus.OKAY, null);
      }
    }
  }

  public getMinuteFormat(zeroPadded: boolean): DateFormatSegment {
    if (zeroPadded) {
      return new DateFormatSegment("%M", DateFormatSegmentStatus.OKAY, null);
    } else {
      return new DateFormatSegment("%-M", DateFormatSegmentStatus.OKAY, null);
    }
  }

  public getSecondFormat(zeroPadded: boolean): DateFormatSegment {
    if (zeroPadded) {
      return new DateFormatSegment("%S", DateFormatSegmentStatus.OKAY, null);
    } else {
      return new DateFormatSegment("%-S", DateFormatSegmentStatus.OKAY, null);
    }
  }

  public getMillisecondFormat(): DateFormatSegment {
    return new DateFormatSegment("%N", DateFormatSegmentStatus.OKAY, null);
  }

  public getAMPMFormat(caseStyle: CaseStyle): DateFormatSegment {
    switch (caseStyle) {
      case CaseStyle.Upper:
        return new DateFormatSegment("%p", DateFormatSegmentStatus.OKAY, null);
      case CaseStyle.Lower:
        return new DateFormatSegment("%P", DateFormatSegmentStatus.OKAY, null);
      case CaseStyle.Title:
        return new DateFormatSegment("%P", DateFormatSegmentStatus.WARN, "There is no title case for AMPM");
    }
  }

  public getShortTimezoneFormat(caseStyle: CaseStyle): DateFormatSegment {
    return new DateFormatSegment("%Z", DateFormatSegmentStatus.OKAY, null);
  }

  public getLongTimezoneFormat(caseStyle: CaseStyle): DateFormatSegment {
    return new DateFormatSegment("Error", DateFormatSegmentStatus.ERROR, "Coreutils Date does not support Long Timezones");
  }

  public getTimezoneOffsetHourFormat(): DateFormatSegment {
    return new DateFormatSegment("%:::z", DateFormatSegmentStatus.WARN, "This mode specifies to necessary precision. Coreutils Date does not have a way of forcing only hour.");
  }

  public getTimezoneOffsetHourMinuteFormat(): DateFormatSegment {
    return new DateFormatSegment("%z", DateFormatSegmentStatus.OKAY, null);
  }

  public getTimezoneOffsetHourMinuteSecondFormat(): DateFormatSegment {
    return new DateFormatSegment("%::z", DateFormatSegmentStatus.ERROR, "There is no way to specify hour-minute-second without separators in bash");
  }

  public getTimezoneOffsetHourMinuteSeparatedFormat(): DateFormatSegment {
    return new DateFormatSegment("%:z", DateFormatSegmentStatus.OKAY, null);
  }

  public getTimezoneOffsetHourMinuteSecondSeparatedFormat(): DateFormatSegment {
    return new DateFormatSegment("%::z", DateFormatSegmentStatus.OKAY, null);
  }

  public getEpochFormat(milliseconds: boolean): DateFormatSegment {
    return new DateFormatSegment("%s", DateFormatSegmentStatus.OKAY, null);
  }

  public getFillFormat(token: string): DateFormatSegment {
    return new DateFormatSegment(token.replace('%', '%%'), DateFormatSegmentStatus.OKAY, null);
  }

  // TODO: what if it doesn't have parsing?? (like this one) Probably, just return null and show an info
  public getParseExample(): string {
    return "date '+" + this.getFormatString() + "' --date='" + this.datetime.toString() + "'";
  }

  public getPrintExample(): string {
    return "date '+" + this.getFormatString() + "'";
  }

  private getCasedSegmentType(caseStyle: CaseStyle, formatString: string, extraFormatters: string): DateFormatSegment {
    let format = "%" + extraFormatters;
    let stat = DateFormatSegmentStatus.OKAY;
    let tooltip = null;
    switch (caseStyle) {
      case CaseStyle.Upper:
        format += "^";
        break;
      case CaseStyle.Lower:
        stat = DateFormatSegmentStatus.ERROR;
        tooltip = "Coreutils Date does not have an option for lowercase.";
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
