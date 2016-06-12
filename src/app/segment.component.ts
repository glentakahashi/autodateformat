import {Component} from 'angular2/core';
import {Segment} from './segment';
import {SegmentType} from './segment-type';
import {SegmentTypeComponent} from './segment-type.component';

@Component({
  directives: [SegmentTypeComponent],
  inputs: ['segment', 'datetime'],
  selector: 'segment',
  template: `
    <div class="segment">
      <pre class="token">{{segment.token}}</pre>
      <div><a (click)="datetime.splitSegment(segment)">Split</a> | <a (click)="datetime.editSegment(segment)">Edit</a> | <a (click)="datetime.deleteSegment(segment)">Delete</a></div>
      <segmentType *ngFor="#segmentType of segment.getTypes()" [segmentType]="segmentType" (click)="setSelected(segment,segmentType)" [hidden]="!showDisabled" [selected]="isSelected(segment, segmentType)"></segmentType>
      <div class="segment-type-expander" (click)="toggleDisabled()">&darr;</div>
    </div>
  `,
})
export class SegmentComponent {
  private showDisabled = false;

  public setSelected(segment: Segment, segmentType: SegmentType): void {
    segment.setSelectedID(segmentType.getID());
  }

  public toggleDisabled(): void {
    this.showDisabled = !this.showDisabled;
  }

  public isSelected(segment: Segment, segmentType: SegmentType): boolean {
    if (!segment.getSelected()) {
      return false;
    }
    return segment.getSelectedType().id === segmentType.getID();
  }
}
