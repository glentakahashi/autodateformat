import {Component} from 'angular2/core';
import {Segment} from './segment';
import {SegmentType} from './segment-type';
import {SegmentTypeComponent} from './segment-type.component';

@Component({
  directives: [SegmentTypeComponent],
  inputs: ['segment'],
  selector: 'segment',
  template: `
    <div class="segment">
      Token: {{segment.token}}
      <segmentType *ngFor="#segmentType of segment.getTypes()" [segmentType]="segmentType" (click)="setSelected(segment,segmentType)" [selected]="isSelected(segment, segmentType)"></segmentType>
    </div>
  `,
})
export class SegmentComponent {
  public setSelected(segment: Segment, segmentType: SegmentType): void {
    segment.setSelectedName(segmentType.getName());
  }

  public isSelected(segment: Segment, segmentType: SegmentType): boolean {
    if (!segment.getSelected()) {
      return false;
    }
    return segment.getSelected().name === segmentType.getName();
  }
}
