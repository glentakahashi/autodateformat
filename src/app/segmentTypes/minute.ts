

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
        this.settings.setValue("leadingZeroes", false);
      }
      this.valid = true;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZeroes").getValue();
  }
}
