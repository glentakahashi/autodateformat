import {Component} from 'angular2/core';
import {DateTime} from './datetime';
import {DateTimeComponent} from './datetime.component';
import {DateFormatComponent} from './dateformat.component';

@Component({
  directives: [DateTimeComponent, DateFormatComponent],
  selector: 'converter',
  template: `
    <div>
      <div>
        <input [(ngModel)]="date" className="date" type="text"/>
        <button className="btn" (click)="convert()">Convert</button>
        <button className="btn" (click)="setRandom()">Random</button>
      </div>
      <dateformat [datetime]="datetime"></dateformat>
      <datetime [datetime]="datetime"></datetime>
    </div>
  `,
})
export class ConverterComponent {
  private date: string;
  private datetime: DateTime;

  private testDates: string[] = [
    "Sun, 29 Feb 2004 16:21:42 -0800",
    "Wednesday 16th October 2013 19:00 CET",
    "Sunday, 29 February 2004 16:21:42 -0800",
    "2004-02-29 16:21:42",
    "1997-07-16T19:20:30+01:00",
    "1997-07-16T19:20:30",
    "1997-07-16T19:20+01:00",
    "1997-07-16T19:20",
    "1997-07-07T19:20:30+01:00",
    "1997-07-07T192030+01:00",
    "1997-07-07T192030+0100",
    "1997-07-07 192030+0100",
    "11/11/11",
    "11/11/2011",
    "11.11.2011",
    "11/11/2011 01:03:45.1203",
    "11/11/2011 01:03:45.1203Z",
    "11/11/2011 01:03:45.1203 GMT",
    "20120203-123443",
    "10230810",
  ];

  constructor() {
    this.date = this.getRandomDate();
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private getRandomDate(): string {
    return this.testDates[this.getRandomInt(0, this.testDates.length)];
  }

  // Methods only called by angular
  /* tslint:disable:no-unused-variable */
  private convert() {
    this.datetime = new DateTime(this.date);
  }

  private setRandom() {
    this.date = this.getRandomDate();
  }
}
