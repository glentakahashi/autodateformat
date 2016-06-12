import {Component} from 'angular2/core';
import {SegmentComponent} from './segment.component';

@Component({
    directives: [SegmentComponent],
    inputs: ['datetime'],
    selector: 'datetime',
    template: `
      <div class="datetime" *ngIf="datetime">
        <span *ngFor="#segment of datetime.segments; #last=last" class="segment-container">
          <div class="segment-container-body">
            <segment [segment]="segment" [datetime]="datetime">Segment</segment>
          </div>
          <div class="segment-buttons">
            <div class="insert-segment">
              <span class="glyphicon glyphicon-plus" (click)="datetime.newSegment(segment)" title="Insert Segment"> </span>
            </div>
            <div class="merge-segment">
              <span class="glyphicon glyphicon-resize-small" (click)="datetime.joinSegment(segment)" title="Merge Segments"> </span>
            </div>
          </div>
        </span>
      </div>
    `,
})
export class DateTimeComponent {

}
