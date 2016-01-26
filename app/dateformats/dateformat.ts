import {DateTime} from '../datetime';
import {DateFormatSegment} from './dateformat-segment';

export abstract class DateFormat {
  protected datetime: DateTime;

  constructor(datetime: DateTime) {
    this.datetime = datetime;
  }

  public abstract getFormat(): DateFormatSegment[];
  public abstract getExample(): string;
  public abstract getLabel(): string;
}
