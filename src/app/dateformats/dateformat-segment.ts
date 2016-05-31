export class DateFormatSegment {
  private value: string;
  private stat: DateFormatSegmentStatus;
  private tooltip: string;

  constructor(value: string, s: DateFormatSegmentStatus, tooltip: string) {
    this.value = value;
    this.stat = s;
    this.tooltip = tooltip;
  }

  public getValue(): string {
    return this.value;
  }

  /*
   * ERROR = No mapping at all
   * WARN = Approximate mapping
   * OKAY = Exact mapping
   */
  public getStatusClass(): string {
    switch (this.stat) {
      case DateFormatSegmentStatus.ERROR:
        return 'statusclass-error';
      case DateFormatSegmentStatus.OKAY:
        return 'statusclass-okay';
      case DateFormatSegmentStatus.WARN:
        return 'statusclass-warn';
      default:
        return null;
    }
  }
}

export enum DateFormatSegmentStatus {
  ERROR,
  WARN,
  OKAY
}
