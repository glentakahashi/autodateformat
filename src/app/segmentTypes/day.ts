export class DaySegmentType extends StringSegmentType implements ZeroPaddedSegmentType {
  public static DATE_ENDINGS: string[] = ["st", "nd", "rd", "th"];

  public static id = "Day";
  public static label = "Day";

  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "leadingZero", "Leading Zero", "Whether or not the day is padded with a leading zero.", true
    ));
    this.settings.add(new BooleanSegmentTypeSetting(
      "prettyEnding", "Pretty Ending", "Whether or not the day is suffixed with 'st', 'nd', 'rd' and 'th'.", false
    ));
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
    if ((token.length === 2 || token.length === 1) && Utils.isNumber(token) && parseInt(token, 10) >= 1 && parseInt(token, 10) <= 31) {
      if (token.length === 1) {
        this.settings.setValue("leadingZero", false);
      }
      this.valid = true;
    }
    if (ending && DaySegmentType.DATE_ENDINGS.indexOf(ending.toLowerCase()) !== -1) {
      this.settings.setValue("prettyEnding", true);
    } else if (ending && DaySegmentType.DATE_ENDINGS.indexOf(ending.toLowerCase()) === -1) {
      this.valid = false;
    }
  }

  public isZeroPadded(): boolean {
    return this.settings.get("leadingZero").getValue();
  }

  public isPrettyEnding(): boolean {
    return this.settings.get("prettyEnding").getValue();
  }
}