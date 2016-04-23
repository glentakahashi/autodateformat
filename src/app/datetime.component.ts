import {Component} from 'angular2/core';
import {SegmentComponent} from './segment.component';

@Component({
    directives: [SegmentComponent],
    inputs: ['datetime'],
    selector: 'datetime',
    template: `
      <div class="datetime" *ngIf="datetime">
        <div>{{datetime.toString()}}</div>
        <div *ngFor="#segment of datetime.segments; #last=last">
          <segment [segment]="segment" [datetime]="datetime">Segment</segment>
          <a (click)="datetime.newSegment(segment)">New Segment</a>
          <a *ngIf="!last" (click)="datetime.joinSegment(segment)">Combine Segments</a>
        </div>
      </div>
    `,
})
export class DateTimeComponent {

}
