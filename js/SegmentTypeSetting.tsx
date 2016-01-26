///<reference path="../typings/react/react-global.d.ts" />
///<reference path='./interfaces.d.ts'/>
///<reference path='./Utils.ts'/>
///<reference path='./SegmentType.tsx'/>

abstract class SegmentTypeSetting {
  name: string;
  label: string;
  helptext: string;
  value: any;

  constructor(name: string, label: string, helptext: string, value: any) {
    this.name = name;
    this.label = label;
    this.helptext = helptext;
    this.value = value;
  }

  getName(): string {
    return this.name;
  }

  getValue(): any {
    return this.value;
  }

  setValue(value: any) {
    this.value = value;
  }
}

class BooleanSegmentTypeSetting extends SegmentTypeSetting {
  value: boolean;
}

class StringSegmentTypeSetting extends SegmentTypeSetting {
  value: string;
}

class DropdownSegmentTypeSetting extends SegmentTypeSetting {
  value: number;
  private values: { [id: number]: string };

  constructor(name: string, label: string, helptext: string, value: number, values: { [id: number]: string }) {
    super(name, label, helptext, value);
    this.values = values;
  }

  public getValues(): { [id: number]: string } {
    return this.values;
  }
}
