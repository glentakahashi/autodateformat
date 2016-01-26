import {Component} from 'angular2/core';
import {SegmentComponent} from './segment.component';

@Component({
    directives: [SegmentComponent],
    inputs: ['dt'],
    selector: 'datetime',
    template: `
      <div class="datetime" *ngIf="dt">
        <segment *ngFor="#segment of dt.segments" [segment]="segment">Segment</segment>
      </div>
    `,
})
export class DateTimeComponent {

}
