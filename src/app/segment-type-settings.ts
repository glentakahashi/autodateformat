import {SegmentTypeSetting} from './segment-type-setting';

export class SegmentTypeSettings {
  private settings: { [name: string]: SegmentTypeSetting };

  constructor() {
    this.settings = {};
  }

  public add(setting: SegmentTypeSetting): boolean {
    if (setting.getName() in this.settings) {
      return false;
    }
    this.settings[setting.getName()] = setting;
  }

  public has(name: string): boolean {
    return name in this.settings;
  }

  public set(name: string, value: any) {
    if (!this.has(name)) {
      throw new RangeError("Setting with name " + name + " not found");
    }
    this.settings[name].setValue(value);
  }

  public get(name: string): SegmentTypeSetting {
    if (!this.has(name)) {
      return null;
    }
    return this.settings[name];
  }

  public getSettings(): SegmentTypeSetting[] {
    return Object.keys(this.settings).map((key) => { return this.settings[key]; });
  }
}
