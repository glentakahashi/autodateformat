import {Component} from 'angular2/core';
import {SegmentTypeSettingsComponent} from './segment-type-settings.component';

@Component({
    directives: [SegmentTypeSettingsComponent],
    inputs: ['segmentType', 'selected', 'hidden'],
    selector: 'segmentType',
    template: `
      <div class="segmentType" *ngIf="segmentType.valid" [class.hidden]="!segmentType.enabled && hidden && !selected" [class.disabled]="!segmentType.enabled && !selected" [class.selected]="selected">
        {{segmentType.getLabel()}}
        <segmentTypeSettings [segmentTypeSettings]="segmentType.getSettings()"></segmentTypeSettings>
      </div>
    `,
})
export class SegmentTypeComponent {
}
