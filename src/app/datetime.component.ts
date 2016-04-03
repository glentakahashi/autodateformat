import {Component} from 'angular2/core';
import {SegmentComponent} from './segment.component';

@Component({
    directives: [SegmentComponent],
    inputs: ['datetime'],
    selector: 'datetime',
    template: `
      <div class="datetime" *ngIf="datetime">
        <div>{{datetime.toString()}}</div>
        <a (click)="datetime.joinSegments()">Join Segments</a>
        <div *ngFor="#segment of datetime.segments">
          <segment [segment]="segment" [datetime]="datetime">Segment</segment>
          <a (click)="datetime.newSegment(segment)">New Segment</a>
        </div>
      </div>
    `,
})
export class DateTimeComponent {

}
