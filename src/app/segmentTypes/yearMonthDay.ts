
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