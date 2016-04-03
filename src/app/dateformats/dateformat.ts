import {DateTime} from '../datetime';
import {DateFormatSegment} from './dateformat-segment';

export abstract class DateFormat {
  protected datetime: DateTime;

  constructor(datetime: DateTime) {
    this.datetime = datetime;
  }

  public abstract getFormat(): DateFormatSegment[];
  public abstract getPrintExample(): string;
  public abstract getParseExample(): string;
  public abstract getLabel(): string;
}

//TODO: make it idiot proof, rather than have a switch statement, make every dateFormat implement a function for registering a type, the main service is in charge of registering all the date formats
