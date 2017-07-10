export class EpochSegmentType extends SegmentType {
  public static id = "Epoch";
  public static label = "Unix Epoch";
  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "milliseconds", "Milliseconds", "Whether or not the epoch is in milliseconds.", false
    ));
    if (Utils.isNumber(token)) {
      if (parseInt(token, 10) > 2147483647) {
        this.settings.setValue("milliseconds", true);
      }
      this.valid = true;
    }
  }

  public getMilliseconds(): boolean {
    return this.settings.get("milliseconds").getValue();
  }
}
