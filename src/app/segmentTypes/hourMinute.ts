


// Should always be 24hour
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