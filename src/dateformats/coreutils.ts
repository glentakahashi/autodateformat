import {CaseStyle, Second"./dateformat"from '../segment-type';
import {DateFormat} from './datefor"./dateformat-segment"atSegment, DateFormatSegmentStatus} from './da"../segment-type";

export class CoreutilsDateFormat extends DateFormat {
  protected static label = "Coreutils Date";

  public getDayOfWeekFormat(caseStyle: CaseStyle, abbreviated: boolean): DateFormatSegment {
    if (abbreviated) {
      return this.getCasedSegmentType(caseStyle, "a", "");
    } else {
      return this.getCasedSegmentType(caseStyle, "A", "");
    }
  }

  public getTextMonthFormat(caseStyle: CaseStyle, abbreviated: boolean): DateFormatSegment {
    if (abbreviated) {
      return this.getCasedSegmentType(caseStyle, "b", "");
    } else {
      return this.getCasedSegmentType(caseStyle, "B", "");
    }
  }

  public getDayFormat(caseStyle: CaseStyle, prettyEnding: boolean, zeroPadded: boolean): DateFormatSegment {
    let tooltip = null;
    let stat = DateFormatSegmentStatus.OKAY;
    if (prettyEnding) {
      tooltip = CoreutilsDateFormat.label + " does not support st, nd, rd, th.";
      stat = DateFormatSegmentStatus.WARN;
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

  public getYearFormat(zeroPadded: boolean, twoDigit: boolean): DateFormatSegment {
    let format = "%";
    if (!zeroPadded) {
      format += "-";
    }
    if (twoDigit) {
      format += "y";
    } else {
      format += "Y";
    }
    return new DateFormatSegment(format, DateFormatSegmentStatus.OKAY, null);
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

  public getSecondFractionFormat(secondFractionType: SecondFractionType): DateFormatSegment {
    switch (secondFractionType) {
      case SecondFractionType.Milliseconds:
      case SecondFractionType.Microseconds:
        return new DateFormatSegment("%N", DateFormatSegmentStatus.WARN, CoreutilsDateFormat.label + " can only display nanoseconds.");
      case SecondFractionType.Nanoseconds:
        return new DateFormatSegment("%N", DateFormatSegmentStatus.OKAY, null);
    }
  }

  public getAMPMFormat(caseStyle: CaseStyle, abbreviated: boolean, periods: boolean): DateFormatSegment {
    if (abbreviated) {
      return new DateFormatSegment("%p", DateFormatSegmentStatus.WARN, "Bash cannot output abbreviated ampm");
    }
    if (periods) {
      return new DateFormatSegment("%p", DateFormatSegmentStatus.WARN, "Bash cannot output am/pm with periods.");
    }
    switch (caseStyle) {
      case CaseStyle.Upper:
        return new DateFormatSegment("%p", DateFormatSegmentStatus.OKAY, null);
      case CaseStyle.Lower:
        return new DateFormatSegment("%P", DateFormatSegmentStatus.OKAY, null);
      case CaseStyle.Title:
        return new DateFormatSegment("%P", DateFormatSegmentStatus.WARN, "There is no title case for AMPM");
    }
  }

  public getTimezoneHourFormat(): DateFormatSegment {
    return new DateFormatSegment("%:::z", DateFormatSegmentStatus.WARN,
                                 "This mode specifies to necessary precision. Coreutils Date does not have a way of forcing only hour.");
  }

  public getTimezoneHourMinuteFormat(): DateFormatSegment {
    return new DateFormatSegment("%z", DateFormatSegmentStatus.OKAY, null);
  }

  public getTimezoneHourMinuteSeparatedFormat(): DateFormatSegment {
    return new DateFormatSegment("%:z", DateFormatSegmentStatus.OKAY, null);
  }

  public getTimezoneShortFormat(): DateFormatSegment {
    return new DateFormatSegment("%Z", DateFormatSegmentStatus.OKAY, null);
  }

  public getTimezoneLongFormat(): DateFormatSegment {
    return new DateFormatSegment("Error", DateFormatSegmentStatus.ERROR, "Coreutils Date does not support Long Timezones");
  }

  public getEpochFormat(milliseconds: boolean): DateFormatSegment {
    return new DateFormatSegment("%s", DateFormatSegmentStatus.OKAY, null);
  }

  public getFillFormat(token: string): DateFormatSegment {
    return new DateFormatSegment(token.replace("%", "%%"), DateFormatSegmentStatus.OKAY, null);
  }

  // TODO: what if it doesn't have parsing?? (like this one) Probably, just return null and show an info
  public getParseExample(): string {
    return CoreutilsDateFormat.label + " does not have formatted date parsing. This may still work however:\n"
           + "date '+" + this.getFormatString() + "' --date='" + this.datetime.toString() + "'";
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
        stat = DateFormatSegmentStatus.WARN;
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
