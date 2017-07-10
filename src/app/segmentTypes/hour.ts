

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
        this.settings.setValue("leadingZeroes", false);
      }
      if (parseInt(token, 10) > 12 || token === "00") {
        this.settings.setValue("twentyFour", true);
      }
      this.valid = true;
    }
  }

  public setTwentyFour(value: boolean) {
    this.settings.setValue("twentyFour", value);
  }

  public getTwentyFour(): boolean {
    return this.settings.get("twentyFour").getValue();
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZeroes").getValue();
  }
}
