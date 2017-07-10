
export enum SecondFractionType {
  Milliseconds,
  Microseconds,
  Nanoseconds,
}

export class SecondFractionSegmentType extends SegmentType {
  public static id = "SecondFraction";
  public static label = "Second Fraction";
  constructor(token: string) {
    super(token);
    this.settings.add(new DropdownSegmentTypeSetting(
      "precision", "Precision", "Precision to display.", token.length, {
        [SecondFractionType.Milliseconds]: 'Milliseconds',
        [SecondFractionType.Microseconds]: 'Microseconds',
        [SecondFractionType.Nanoseconds]: 'Nanoseconds',
      }
    ));
    if (Utils.isNumber(token)) {
      if (token.length > 6) {
        this.settings.setValue("precision", SecondFractionType.Nanoseconds);
      } else if (token.length > 3) {
        this.settings.setValue("precision", SecondFractionType.Microseconds);
      } else {
        this.settings.setValue("precision", SecondFractionType.Milliseconds);
      }
      this.valid = true;
    }
  }

  public getPrecision(): number {
    return this.settings.get("precision").getValue();
  }
}
