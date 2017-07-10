import { BooleanSegmentTypeSetting } from "./settings";
import { StringSegmentType } from "./stringSegmentType";

export class AMPMSegmentType extends StringSegmentType {
  public static AMPM: string[] = ["am", "a", "pm", "p"];

  public static id = "AMPM";
  public static label = "AM/PM";

  constructor(token: string) {
    super(token);
    this.settings.add(new BooleanSegmentTypeSetting(
      "periods", "Periods", "Whether or not to put periods between ampm.", token.indexOf('.') !== -1
    ));
    this.settings.add(new BooleanSegmentTypeSetting(
      "abbreviated", "Abbreviated", "Use a/p instead of am/pm", token.length === 1
    ));
    if (AMPMSegmentType.AMPM.indexOf(token.toLowerCase()) !== -1) {
      this.setCaseStyle(token);
      this.valid = true;
    }
  }

  public isPeriods(): boolean {
    return this.settings.get("periods").getValue();
  }

  public isAbbreviated(): boolean {
    return this.settings.get("abbreviated").getValue();
  }
}
