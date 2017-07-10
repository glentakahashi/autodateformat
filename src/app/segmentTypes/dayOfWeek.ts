export class DayOfWeekSegmentType extends StringSegmentType {
  public static id = "DayOfWee";
  public static label = "Day Of Week";

  private static SHORT_DAYS: string[] = ["mon", "tues", "tue", "wed", "thu", "thurs", "fri", "sat", "sun"];
  private static DAYS: string[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting("abbreviated", "Abbreviated", "Abbreviate the name (i.e. Mon,Tues,Wed)", true));
    if (DayOfWeekSegmentType.SHORT_DAYS.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.settings.setValue("abbreviated", true);
      this.valid = true;
    } else if (DayOfWeekSegmentType.DAYS.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.settings.setValue("abbreviated", false);
      this.valid = true;
    }
  }

  public isAbbreviated(): boolean {
    return this.settings.get("abbreviated").getValue();
  }
}