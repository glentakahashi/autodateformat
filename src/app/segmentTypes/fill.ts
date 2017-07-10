export class FillSegmentType extends SegmentType {
  public static id = "Fill";
  public static label = "Plain Text";
  constructor(token: string) {
    super(token);
    this.settings.add(new StringSegmentTypeSetting("token", "String", "The content of the fill", token));
    this.valid = true;
  }

  public getToken(): string {
    return this.settings.get("token").getValue();
  }
}
