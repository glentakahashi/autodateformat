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
          <a (click)="datetime.newSegment(segment)">Insert Segment</a>
          <a *ngIf="!last" (click)="datetime.joinSegment(segment)">Merge Segments</a>
        </div>
      </div>
    `,
})
export class DateTimeComponent {

}
