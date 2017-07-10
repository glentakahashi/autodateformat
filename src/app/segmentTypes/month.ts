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
        this.settings.setValue("leadingZero", false);
      }
      this.valid = true;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZero").getValue();
  }
}