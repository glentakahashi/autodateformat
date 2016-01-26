import {DateFormat} from './dateformat';
// import {Segment} from '../segment';

export class BatchDateFormat extends DateFormat {
  public getLabel(): string {
    return "Windows Batch";
  }
  public getFormat(): string {
    let format = "";
    // let segments: Segment = this.datetime.getSegments();
    // for(let i = 0; i < segments.length; i++) {
      // let segment = segments[i];
    // }
    return format;
  }
  public getExample(): string {
    return "asdf";
  }
}
