export enum CaseStyle {
  Lower,
  Upper,
  Title,
  Unknown
}

export abstract class StringSegmentType extends SegmentType {
  constructor(token: string) {
    super(token);
    let styles: { [id: number]: string } = {
      [CaseStyle.Lower]: "lower",
      [CaseStyle.Upper]: "UPPER",
      [CaseStyle.Title]: "Title",
    };
    this.settings.add(new DropdownSegmentTypeSetting("caseStyle", "Case Style", null, CaseStyle.Title, styles));
    this.setCaseStyle(token);
  }

  // XXX: Title should be default?
  public static parseCaseStyle(str: string): CaseStyle {
    if (/^[a-z]+$/.test(str)) {
      return CaseStyle.Lower;
    } else if (/^[A-Z]+$/.test(str)) {
      return CaseStyle.Upper;
    } else {
      return CaseStyle.Title;
    }
  }

  public setCaseStyle(token: string) {
    this.settings.get("caseStyle").setValue(StringSegmentType.parseCaseStyle(token));
  }

  public getCaseStyle(): number {
    return parseInt(this.settings.get("caseStyle").getValue(), 10);
  }
}