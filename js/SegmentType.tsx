///<reference path='./interfaces.d.ts'/>
///<reference path='./Utils.ts'/>
///<reference path='./Timezones.ts'/>
///<reference path='./SegmentTypeSettings.tsx'/>

// TODO: refactor getters and setters to have more consistent names

class SegmentType {
  valid: boolean = false;
  enabled: boolean = true;
  segment: string;
  settings: SegmentTypeSettings;

  // TODO: does this conflict with native name parameter in ES6?
  public static name: string;

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

  public getName(): string {
    return this.constructor["name"];
  }
}

enum CaseStyle {
  Lower,
  Upper,
  Title,
  Unknown
}

class StringSegmentType extends SegmentType {
  constructor(token: string) {
    super(token);
    let styles: { [id: number]: string } = {
      [CaseStyle.Lower]: "lower",
      [CaseStyle.Upper]: "UPPER",
      [CaseStyle.Title]: "Title"
    };
    this.settings.add(new DropdownSegmentTypeSetting("caseStyle", "Case Style", null, CaseStyle.Title, styles));
    this.setCaseStyle(token);
  }

  public static parseCaseStyle(str: string): CaseStyle {
    if (/^[a-z]+$/.test(str)) {
      return CaseStyle.Lower;
    } else if (/^[A-Z]+$/.test(str)) {
      return CaseStyle.Upper;
    } else if (/^[A-Z][a-z]+$/.test(str)) {
      return CaseStyle.Title;
    }
    // TODO: make this n/a or something?
    return CaseStyle.Unknown;
  }

  public setCaseStyle(token: string) {
    this.settings.get("caseStyle").setValue(StringSegmentType.parseCaseStyle(token));
  }

  public getCaseStyle(): string {
    return this.settings.get("caseStyle").getValue();
  }
}

class ShortDaySegmentType extends StringSegmentType {
  name = "ShortDay";
  short_days: string[] = ["mon", "tues", "tue", "wed", "thu", "thurs", "fri", "sat", "sun"];
  constructor(token: string) {
    super(token);
    if (this.short_days.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }
}

class LongDaySegmentType extends StringSegmentType {
  name = "LongDay";
  days: string[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  constructor(token: string) {
    super(token);
    if (this.days.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }
}

class ShortMonthSegmentType extends StringSegmentType {
  name = "ShortMonth";
  short_months: string[] = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "sept", "oct", "nov", "dec"];
  constructor(token: string) {
    super(token);
    if (this.short_months.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }
}

class LongMonthSegmentType extends StringSegmentType {
  name = "LongMonth";
  months: string[] = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  constructor(token: string) {
    super(token);
    if (this.months.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }
}

class DaySegmentType extends StringSegmentType {
  name = "Day";
  public static date_endings: string[] = ["st", "nd", "rd", "th"];
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting("leadingZero", "Leading Zero", "Whether or not the day is padded with a leading zero.", false));
    this.settings.add(new BooleanSegmentTypeSetting("prettyEnding", "Pretty Ending", "Whether or not the day is suffixed with 'st', 'nd', 'rd', and 'th'.", false));
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
    if ((token.length === 2 || token.length === 1) && isInteger(token) && parseInt(token) >= 1 && parseInt(token) <= 31) {
      if (token[0] === "0") {
        this.settings.set("leadingZero", true);
      }
      this.valid = true;
    }
    if (ending && DaySegmentType.date_endings.indexOf(ending.toLowerCase()) !== -1) {
      this.settings.set("prettyEnding", true);
    } else if (ending && DaySegmentType.date_endings.indexOf(ending.toLowerCase()) === -1) {
      this.valid = false;
    }
  }
}

class MonthSegmentType extends SegmentType {
  name = "Month";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting("leadingZero", "Leading Zero", "Whether or not the month is padded with a leading zero.", false));
    if ((token.length === 2 || token.length === 1) && isInteger(token) && parseInt(token) >= 1 && parseInt(token) <= 12) {
      if (token[0] === "0") {
        this.settings.set("leadingZero", true);
      }
      this.valid = true;
    }
  }
}

// For the sake of usability, this assumes you never have a 1-3 digit year.
class YearSegmentType extends SegmentType {
  name = "Year";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting("leadingZeroes", "Leading Zeroes", "Whether or not the year is padded with leading zeroes.", false));
    if (token.length === 4 && isInteger(token)) {
      if (token[0] === "0") {
        this.settings.set("leadingZeroes", true);
      }
      this.valid = true;
    }
  }
}

class ShortYearSegmentType extends SegmentType {
  name = "ShortYear";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting("leadingZeroes", "Leading Zeroes", "Whether or not the year is padded with leading zeroes.", false));
    if (token.length === 2 && isInteger(token)) {
      if (token[0] === "0") {
        this.settings.set("leadingZeroes", true);
      }
      this.valid = true;
    }
  }
}

class HourMinuteSegmentType extends SegmentType {
  name = "HourMinute";
  constructor(token: string) {
    super(token);
    if (token.length === 4 && isInteger(token)) {
      this.valid = true;
    }
  }
}

class HourMinuteSecondSegmentType extends SegmentType {
  name = "HourMinuteSecond";
  constructor(token: string) {
    super(token);
    if (token.length === 6 && isInteger(token)) {
      this.valid = true;
    }
  }
}

class HourSegmentType extends SegmentType {
  name = "Hour";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting("leadingZeroes", "Leading Zeroes", "Whether or not the year is padded with leading zeroes.", false));
    this.settings.add(new BooleanSegmentTypeSetting("twentyFour", "24-Hour", "Whether or not the hour is in 24-hour format.", false));
    if ((token.length === 2 || token.length === 1) && isInteger(token)) {
      if (token[0] === "0") {
        this.settings.set("leadingZeroes", true);
      }
      if (parseInt(token) > 12 || token === "00") {
        this.settings.set("twentyFour", true);
      }
      this.valid = true;
    }
  }

  public setTwentyFour(value: boolean) {
    this.settings.set("twentyFour", value);
  }
}

class MinuteSegmentType extends SegmentType {
  name = "Minute";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting("leadingZeroes", "Leading Zeroes", "Whether or not the minute is padded with leading zeroes.", false));
    if ((token.length === 2 || token.length === 1) && isInteger(token) && parseInt(token) >= 0 && parseInt(token) < 60) {
      if (token[0] === "0") {
        this.settings.set("leadingZeroes", true);
      }
      this.valid = true;
    }
  }
}

class SecondSegmentType extends SegmentType {
  name = "Second";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting("leadingZeroes", "Leading Zeroes", "Whether or not the second is padded with leading zeroes.", false));
    if ((token.length === 2 || token.length === 1) && isInteger(token) && parseInt(token) >= 0 && parseInt(token) < 60) {
      if (token[0] === "0") {
        this.settings.set("leadingZeroes", true);
      }
      this.valid = true;
    }
  }
}

class MillisecondSegmentType extends SegmentType {
  name = "Millisecond";
  constructor(token: string) {
    super(token);
    if (isInteger(token)) {
      this.valid = true;
    }
  }
}

class AMPMSegmentType extends StringSegmentType {
  name = "AMPM";
  ampm: string[] = ["am", "a", "pm", "p"];
  constructor(token: string) {
    super(token);
    if (this.ampm.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }
}

class ShortTimezoneSegmentType extends StringSegmentType {
  name = "ShortTimezone";
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

class LongTimezoneSegmentType extends StringSegmentType {
  name = "LongTimezone";
  constructor(token: string) {
    super(token);
    if (Timezones.TIMEZONES.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }
}

enum TimezoneOffsetType {
  Hour, // +-XX
  HourMinute, // +-XXXX
  HourMinuteSecond, // +-XXXXXX
  HourMinuteSeparated, // +-XX:XX
  HourMinuteSecondSeparated // +-XX:XX:XX
};

class TimezoneOffsetSegmentType extends SegmentType {
  name = "TimezoneOffset";
  // XXX: What is this???
  rfc: boolean = false;
  constructor(token: string) {
    super(token);
    let types: { [id: number]: string } = {
      [TimezoneOffsetType.Hour]: "+-XX",
      [TimezoneOffsetType.HourMinute]: "+-XXXX",
      [TimezoneOffsetType.HourMinuteSecond]: "+-XXXXXX",
      [TimezoneOffsetType.HourMinuteSeparated]: "+-XX:XX",
      [TimezoneOffsetType.HourMinuteSecondSeparated]: "+-XX:XX:XX",
    };
    this.settings.add(new DropdownSegmentTypeSetting("timezoneOffsetType", "Timezone Offset Type", null, TimezoneOffsetType.HourMinute, types));
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
}

class EpochSegmentType extends SegmentType {
  name = "Epoch";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting("milliseconds", "Milliseconds", "Whether or not the epoch is in milliseconds.", false));
    if (isInteger(token)) {
      if (parseInt(token) > 2147483647) {
        this.settings.set("milliseconds", true);
      }
      this.valid = true;
    }
  }
}

class FillSegmentType extends SegmentType {
  name = "Fill";
  constructor(token: string) {
    super(token);
    this.settings.add(new StringSegmentTypeSetting("token", "String", "The content of the fill", token));
    this.valid = true;
  }
}
