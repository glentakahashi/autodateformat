// For the sake of usability, this assumes dates after 1970.
export class YearSegmentType extends SegmentType implements ZeroPaddedSegmentType {
  public static id = "Year";
  public static label = "Year";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZeroes", "Leading Zeroes", "Whether or not the year is padded with leading zeroes.", true
    ));
    this.settings.add(new BooleanSegmentTypeSetting(
      "twoDigit", "Two Digit", "Abbreviate the year to the last two digits.", false
    ));
    if ((token.length === 4 || token.length === 2) && Utils.isNumber(token)) {
      if (token.length === 2) {
        this.settings.setValue("twoDigit", true);
      }
      this.valid = true;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZeroes").getValue();
  }

  public isTwoDigit(): boolean {
    return this.settings.get("twoDigit").getValue();
  }
}
