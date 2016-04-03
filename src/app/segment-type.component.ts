import {Component} from 'angular2/core';
import {SegmentTypeSettingsComponent} from './segment-type-settings.component';

@Component({
    directives: [SegmentTypeSettingsComponent],
    inputs: ['segmentType', 'selected'],
    selector: 'segmentType',
    template: `
      <div class="segmentType" *ngIf="segmentType.valid" [class.disabled]="!segmentType.enabled" [class.selected]="selected">
        {{segmentType.name}}
        <segmentTypeSettings [segmentTypeSettings]="segmentType.getSettings()"></segmentTypeSettings>
      </div>
    `,
})
export class SegmentTypeComponent {
}
