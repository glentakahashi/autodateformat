
export enum TimezoneType {
  Hour, // +-XX
  HourMinute, // +-XXXX (Z Default)
  HourMinuteSeparated, // +-XX:XX
  Short, // GMT
  Long, // America/Pacific
};

export class TimezoneSegmentType extends SegmentType {
  public static id = "Timezone";
  public static label = "Timezone ";

  // XXX: What is this???
  // private rfc: boolean = false;

  constructor(token: string) {
    super(token);
    let types: { [id: number]: string } = {
      [TimezoneType.Hour]: "+-XX",
      [TimezoneType.HourMinute]: "+-XXXX or Zulu (Z)",
      [TimezoneType.HourMinuteSeparated]: "+-XX:XX",
      [TimezoneType.Short]: "PST/GMT/CEST etc.",
      [TimezoneType.Long]: "America/Pacific, etc.",
    };
    this.settings.add(new DropdownSegmentTypeSetting(
      "timezoneType", "Timezone  Type", null, TimezoneType.HourMinute, types
    ));
    this.valid = true;
    if (/^[-+]\d{2}$/.test(token)) {
      this.settings.setValue("timezoneType", TimezoneType.Hour);
    } else if (token.toLowerCase() === 'z' || /^[-+]\d{4}$/.test(token)) {
      this.settings.setValue("timezoneType", TimezoneType.HourMinute);
    } else if (/^[-+]\d\d:\d\d$/.test(token)) {
      this.settings.setValue("timezoneType", TimezoneType.HourMinuteSeparated);
    } else if (Timezones.SHORT_TIMEZONES.indexOf(token.toLowerCase()) !== -1) {
      this.settings.setValue("timezoneType", TimezoneType.Short);
    } else if (Timezones.TIMEZONES.indexOf(token.toLowerCase()) !== -1) {
      this.settings.setValue("timezoneType", TimezoneType.Long);
    } else {
      this.valid = false;
    }
  }

  public getTimezoneType(): number {
    return parseInt(this.settings.get("timezoneType").getValue(), 10);
  }
}