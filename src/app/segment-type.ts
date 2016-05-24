import {Utils} from './utils';
import {Timezones} from './timezones';
import {SegmentTypeSettings} from './segment-type-settings';
import {BooleanSegmentTypeSetting, StringSegmentTypeSetting, DropdownSegmentTypeSetting} from './segment-type-setting';

// TODO: refactor getters and setters to have more consistent ids

// TODO: define a "split" verb and a "join" verb to combine two segments? It must do it automatically?
// i.e. -102034 = Timezone by default, be able to split into -, 102034.
// 102034 = hourminutesecond/epoch by default, etc. able to split at any spot you want - make the user do the functionality?? Maybe keep the combined words for ease of use, but allow to split
// Initial parsing only defines initial segments
// Put on the Segment class (make a single UI for splitting/joining the string, strings will be short so maybe just make an easy "drag a line bar" thing)

interface ZeroPaddedSegmentType {
  isZeroPadded(): boolean;
}

export abstract class SegmentType {
  public static id: string;
  public static label: string;

  protected settings: SegmentTypeSettings;
  protected valid: boolean = false;

  private enabled: boolean = true;
  private segment: string;

  constructor(token: string) {
    this.segment = token;
    this.settings = new SegmentTypeSettings();
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public enable() {
    this.enabled = true;
  }

  public disable() {
    this.enabled = false;
  }

  public isValid(): boolean {
    return this.valid;
  }

  public getValue(): string {
    return this.segment;
  }

  public getSettings(): SegmentTypeSettings {
    return this.settings;
  }

  public getLabel(): string {
    return this.getStaticElement('label');
  }

  public getID(): string {
    return this.getStaticElement('id');
  }

  private getStaticElement(id: string): any {
    return this.constructor[id];
  }
}

export enum CaseStyle {
  Lower,
  Upper,
  Title,
  Unknown
}

export abstract class StringSegmentType extends SegmentType {
  constructor(token: string) {
    super(token);
    let styles: { [id: number]: string } = {
      [CaseStyle.Lower]: "lower",
      [CaseStyle.Upper]: "UPPER",
      [CaseStyle.Title]: "Title",
    };
    this.settings.add(new DropdownSegmentTypeSetting("caseStyle", "Case Style", null, CaseStyle.Title, styles));
    this.setCaseStyle(token);
  }

  // XXX: Title should be default?
  public static parseCaseStyle(str: string): CaseStyle {
    if (/^[a-z]+$/.test(str)) {
      return CaseStyle.Lower;
    } else if (/^[A-Z]+$/.test(str)) {
      return CaseStyle.Upper;
    } else {
      return CaseStyle.Title;
    }
  }

  public setCaseStyle(token: string) {
    this.settings.get("caseStyle").setValue(StringSegmentType.parseCaseStyle(token));
  }

  public getCaseStyle(): number {
    return parseInt(this.settings.get("caseStyle").getValue(), 10);
  }
}

export class ShortDaySegmentType extends StringSegmentType {
  public static SHORT_DAYS: string[] = ["mon", "tues", "tue", "wed", "thu", "thurs", "fri", "sat", "sun"];

  public static id = "ShortDay";
  public static label = "Abbreviated Day";

  constructor(token: string) {
    super(token);
    if (ShortDaySegmentType.SHORT_DAYS.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }
}

export class LongDaySegmentType extends StringSegmentType {
  public static id = "LongDay";
  public static label = "Full Day";

  private static DAYS: string[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  constructor(token: string) {
    super(token);
    if (LongDaySegmentType.DAYS.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }
}

export class ShortMonthSegmentType extends StringSegmentType {
  public static SHORT_MONTHS: string[] = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "sept", "oct", "nov", "dec",
  ];

  public static id = "ShortMonth";
  public static label = "Abbreviated Month";

  constructor(token: string) {
    super(token);
    if (ShortMonthSegmentType.SHORT_MONTHS.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }
}

export class LongMonthSegmentType extends StringSegmentType {
  public static MONTHS: string[] = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
  ];

  public static id = "LongMonth";
  public static label = "Full Month";

  constructor(token: string) {
    super(token);
    if (LongMonthSegmentType.MONTHS.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }
}

export class DaySegmentType extends StringSegmentType implements ZeroPaddedSegmentType {
  public static DATE_ENDINGS: string[] = ["st", "nd", "rd", "th"];

  public static id = "Day";
  public static label = "Day";

  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZero", "Leading Zero", "Whether or not the day is padded with a leading zero.", true
    ));
    this.settings.add(new BooleanSegmentTypeSetting(
      "prettyEnding", "Pretty Ending", "Whether or not the day is suffixed with 'st', 'nd', 'rd' and 'th'.", false
    ));
    let ending: string;
    if (token.length === 3) {
      ending = token.substring(1, 3);
      token = token[0];
    } else if (token.length === 4) {
      ending = token.substring(2, 4);
      token = token.substring(0, 2);
    }
    if (ending) {
      this.setCaseStyle(ending);
    }
    if ((token.length === 2 || token.length === 1) && Utils.isNumber(token) && parseInt(token, 10) >= 1 && parseInt(token, 10) <= 31) {
      if (token.length === 1) {
        this.settings.set("leadingZero", false);
      }
      this.valid = true;
    }
    if (ending && DaySegmentType.DATE_ENDINGS.indexOf(ending.toLowerCase()) !== -1) {
      this.settings.set("prettyEnding", true);
    } else if (ending && DaySegmentType.DATE_ENDINGS.indexOf(ending.toLowerCase()) === -1) {
      this.valid = false;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZero").getValue();
  }

  public isPrettyEnding(): boolean {
    return this.settings.get("prettyEnding").getValue();
  }
}

export class MonthSegmentType extends SegmentType implements ZeroPaddedSegmentType {
  public static id = "Month";
  public static label = "Month";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZero", "Leading Zero", "Whether or not the month is padded with a leading zero.", true
    ));
    if ((token.length === 2 || token.length === 1) && Utils.isNumber(token) && parseInt(token, 10) >= 1 && parseInt(token, 10) <= 12) {
      if (token.length === 1) {
        this.settings.set("leadingZero", false);
      }
      this.valid = true;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZero").getValue();
  }
}

// For the sake of usability, this assumes you never have a 1-3 digit year.
export class YearSegmentType extends SegmentType implements ZeroPaddedSegmentType {
  public static id = "Year";
  public static label = "Year";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZeroes", "Leading Zeroes", "Whether or not the year is padded with leading zeroes.", true
    ));
    if (token.length === 4 && Utils.isNumber(token)) {
      this.valid = true;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZeroes").getValue();
  }
}

export class ShortYearSegmentType extends SegmentType implements ZeroPaddedSegmentType {
  public static id = "ShortYear";
  public static label = "2 Digit Year";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      // What kind of fool uses non-zero padded short-year?
      "leadingZero", "Leading Zero", "Whether or not the year is padded with a leading zero.", true
    ));
    if (token.length === 2 && Utils.isNumber(token)) {
      this.valid = true;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZero").getValue();
  }
}

// I don't think this should ever be non-24 hour
export class HourMinuteSegmentType extends SegmentType {
  public static id = "HourMinute";
  public static label = "Hour and Minute";
  constructor(token: string) {
    super(token);
    if (token.length === 4 && Utils.isNumber(token)) {
      this.valid = true;
    }
  }
}

// I don't think this should ever be non-24 hour
export class HourMinuteSecondSegmentType extends SegmentType {
  public static id = "HourMinuteSecond";
  public static label = "Hour, Minute and Second";
  constructor(token: string) {
    super(token);
    if (token.length === 6 && Utils.isNumber(token)) {
      this.valid = true;
    }
  }
}

export class YearMonthDaySegmentType extends SegmentType {
  public static id = "YearMonthDay";
  public static label = "Year, Month and Day";
  constructor(token: string) {
    super(token);
    if (token.length === 8 && Utils.isNumber(token)) {
      this.valid = true;
    }
  }
}

export class YearMonthDayHourMinuteSegmentType extends SegmentType {
  public static id = "YearMonthDayHourMinute";
  public static label = "Year, Month, Day, Hour and Minute";
  constructor(token: string) {
    super(token);
    if (token.length === 12 && Utils.isNumber(token)) {
      this.valid = true;
    }
  }
}

export class YearMonthDayHourMinuteSecondSegmentType extends SegmentType {
  public static id = "YearMonthDayHourMinuteSecond";
  public static label = "Year, Month, Day, Hour, Minute and Second";
  constructor(token: string) {
    super(token);
    if (token.length === 14 && Utils.isNumber(token)) {
      this.valid = true;
    }
  }
}


// TODO: multisegment = things that are together
// split 19930822 into Y/m/d, y/m/d, h/m/s
// if length 8, use other stuff
// for example, when writing files to disk i do stuff like 20160103080405
export class MultiSegment extends SegmentType {
}

export class HourSegmentType extends SegmentType implements ZeroPaddedSegmentType {
  public static id = "Hour";
  public static label = "Hour";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZeroes", "Leading Zeroes", "Whether or not the year is padded with leading zeroes.", true
    ));
    this.settings.add(new BooleanSegmentTypeSetting(
      "twentyFour", "24-Hour", "Whether or not the hour is in 24-hour format.", false
    ));
    if ((token.length === 2 || token.length === 1) && Utils.isNumber(token)) {
      if (token.length === 1) {
        this.settings.set("leadingZeroes", false);
      }
      if (parseInt(token, 10) > 12 || token === "00") {
        this.settings.set("twentyFour", true);
      }
      this.valid = true;
    }
  }

  public setTwentyFour(value: boolean) {
    this.settings.set("twentyFour", value);
  }

  public getTwentyFour(): boolean {
    return this.settings.get("twentyFour").getValue();
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZeroes").getValue();
  }
}

export class MinuteSegmentType extends SegmentType implements ZeroPaddedSegmentType {
  public static id = "Minute";
  public static label = "Minute";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZeroes", "Leading Zeroes", "Whether or not the minute is padded with leading zeroes.", true
    ));
    if ((token.length === 2 || token.length === 1) && Utils.isNumber(token) && parseInt(token, 10) >= 0 && parseInt(token, 10) < 60) {
      if (token.length === 1) {
        this.settings.set("leadingZeroes", false);
      }
      this.valid = true;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZeroes").getValue();
  }
}

export class SecondSegmentType extends SegmentType implements ZeroPaddedSegmentType {
  public static id = "Second";
  public static label = "Second";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZeroes", "Leading Zeroes", "Whether or not the second is padded with leading zeroes.", true
    ));
    if ((token.length === 2 || token.length === 1) && Utils.isNumber(token) && parseInt(token, 10) >= 0 && parseInt(token, 10) < 60) {
      if (token.length === 1) {
        this.settings.set("leadingZeroes", false);
      }
      this.valid = true;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZeroes").getValue();
  }
}

export class MillisecondSegmentType extends SegmentType {
  public static id = "Millisecond";
  public static label = "Millisecond";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "nanoseconds", "Nanoseconds", "If this is nanoseconds or not.", false
    ));
    if (Utils.isNumber(token)) {
      this.valid = true;
      if (token.length > 3) {
        this.settings.set("nanoseconds", true);
      }
    }
  }
}

export class AMPMSegmentType extends StringSegmentType {
  public static AMPM: string[] = ["am", "a", "pm", "p"];

  public static id = "AMPM";
  public static label = "AM/PM";

  constructor(token: string) {
    super(token);
    if (AMPMSegmentType.AMPM.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }
}

export class ShortTimezoneSegmentType extends StringSegmentType {
  public static id = "ShortTimezone";
  public static label = "Abbreviated Timezone";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting("z", "Z", null, false));
    if (Timezones.SHORT_TIMEZONES.indexOf(token.toLowerCase()) !== -1) {
      if (token.toLowerCase() === "z") {
        this.settings.set("z", true);
      }
      this.setCaseStyle(token);
      this.valid = true;
    }
  }
}

export class LongTimezoneSegmentType extends StringSegmentType {
  public static id = "LongTimezone";
  public static label = "Full Timezone";
  constructor(token: string) {
    super(token);
    if (Timezones.TIMEZONES.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }
}

export enum TimezoneOffsetType {
  // TODO: reid to "Necessary precision??" Does anything use an "Hour only" timezone, given that there are things that are 1:30, 5:45, etc.
  // US uses things like -3 CST or -3 EST or  stuff??
  Hour, // +-XX
  HourMinute, // +-XXXX
  HourMinuteSecond, // +-XXXXXX
  HourMinuteSeparated, // +-XX:XX
  HourMinuteSecondSeparated // +-XX:XX:XX
};

export class TimezoneOffsetSegmentType extends SegmentType {
  public static id = "TimezoneOffset";
  public static label = "Timezone Offset";

  // XXX: What is this???
  // private rfc: boolean = false;

  constructor(token: string) {
    super(token);
    let types: { [id: number]: string } = {
      [TimezoneOffsetType.Hour]: "+-XX",
      [TimezoneOffsetType.HourMinute]: "+-XXXX",
      [TimezoneOffsetType.HourMinuteSecond]: "+-XXXXXX",
      [TimezoneOffsetType.HourMinuteSeparated]: "+-XX:XX",
      [TimezoneOffsetType.HourMinuteSecondSeparated]: "+-XX:XX:XX",
    };
    this.settings.add(new DropdownSegmentTypeSetting(
      "timezoneOffsetType", "Timezone Offset Type", null, TimezoneOffsetType.HourMinute, types
    ));
    if (/^[-+](\d\d)((:\d\d){1,2}|(\d\d){1,2})?$/.test(token)) {
      if (/^[-+]\d{2}$/.test(token)) {
        this.settings.set("timezoneOffsetType", TimezoneOffsetType.Hour);
      } else if (/^[-+]\d{4}$/.test(token)) {
        this.settings.set("timezoneOffsetType", TimezoneOffsetType.HourMinute);
      } else if (/^[-+]\d{6}$/.test(token)) {
        this.settings.set("timezoneOffsetType", TimezoneOffsetType.HourMinuteSecond);
      } else if (/^[-+]\d\d:\d\d$/.test(token)) {
        this.settings.set("timezoneOffsetType", TimezoneOffsetType.HourMinuteSeparated);
      } else if (/^[-+]\d\d:\d\d:\d\d$/.test(token)) {
        this.settings.set("timezoneOffsetType", TimezoneOffsetType.HourMinuteSecondSeparated);
      }
      this.valid = true;
    }
  }

  public getTimezoneOffsetType(): number {
    return parseInt(this.settings.get("timezoneOffsetType").getValue(), 10);
  }
}

export class EpochSegmentType extends SegmentType {
  public static id = "Epoch";
  public static label = "Unix Epoch";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "milliseconds", "Milliseconds", "Whether or not the epoch is in milliseconds.", false
    ));
    if (Utils.isNumber(token)) {
      if (parseInt(token, 10) > 2147483647) {
        this.settings.set("milliseconds", true);
      }
      this.valid = true;
    }
  }

  public getMilliseconds(): boolean {
    return this.settings.get("milliseconds").getValue();
  }
}

export class FillSegmentType extends SegmentType {
  public static id = "Fill";
  public static label = "Plain Text";
  constructor(token: string) {
    super(token);
    this.settings.add(new StringSegmentTypeSetting("token", "String", "The content of the fill", token));
    this.valid = true;
  }

  public getToken(): string {
    return this.settings.get("token").getValue();
  }
}

export const SEGMENT_TYPES: (typeof SegmentType)[] = [
  ShortDaySegmentType, LongDaySegmentType, DaySegmentType,
  ShortMonthSegmentType, LongMonthSegmentType, MonthSegmentType,
  YearSegmentType, ShortYearSegmentType,
  // Combined segments
  HourMinuteSegmentType, HourMinuteSecondSegmentType, YearMonthDaySegmentType,
  YearMonthDayHourMinuteSegmentType, YearMonthDayHourMinuteSecondSegmentType,
  HourSegmentType, MinuteSegmentType,
  SecondSegmentType, MillisecondSegmentType, AMPMSegmentType,
  ShortTimezoneSegmentType, LongTimezoneSegmentType, TimezoneOffsetSegmentType,
  EpochSegmentType, FillSegmentType,
];
