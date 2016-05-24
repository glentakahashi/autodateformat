export abstract class SegmentTypeSetting {
  protected value: any;

  private name: string;
  private label: string;
  private helptext: string;

  constructor(name: string, label: string, helptext: string, value: any) {
    this.name = name;
    this.label = label;
    this.helptext = helptext;
    this.value = value;
  }

  public getName(): string {
    return this.name;
  }

  public getValue(): any {
    return this.value;
  }

  public setValue(value: any) {
    this.value = value;
  }

  public getHelpText(): string {
    return this.helptext;
  }
}

export class BooleanSegmentTypeSetting extends SegmentTypeSetting {
  protected value: boolean;

  constructor(name: string, label: string, helptext: string, value: boolean) {
    super(name, label, helptext, value);
  }
}

export class StringSegmentTypeSetting extends SegmentTypeSetting {
  protected value: string;

  constructor(name: string, label: string, helptext: string, value: string) {
    super(name, label, helptext, value);
  }
}

export class DropdownSegmentTypeSetting extends SegmentTypeSetting {
  protected value: number;

  private possibleValues: { [id: number]: string };

  constructor(name: string, label: string, helptext: string, value: number, possibleValues: { [id: number]: string }) {
    super(name, label, helptext, value);
    this.possibleValues = possibleValues;
  }

  public getPossibleValues(): { [id: number]: string } {
    return this.possibleValues;
  }
}
