
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
