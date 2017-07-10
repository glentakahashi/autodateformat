


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
