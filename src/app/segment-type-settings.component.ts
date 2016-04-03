import {Component} from 'angular2/core';
import {
  SegmentTypeSetting,
  BooleanSegmentTypeSetting,
  StringSegmentTypeSetting,
  DropdownSegmentTypeSetting,
} from './segment-type-setting';
import {
  BooleanSegmentTypeSettingComponent,
  StringSegmentTypeSettingComponent,
  DropdownSegmentTypeSettingComponent,
} from './segment-type-setting.component';

@Component({
  directives: [
    BooleanSegmentTypeSettingComponent,
    StringSegmentTypeSettingComponent,
    DropdownSegmentTypeSettingComponent,
  ],
  inputs: ['segmentTypeSettings'],
  selector: 'segmentTypeSettings',
  // TODO: is there a better way to do this?
  template: `
    <div class="segmentTypeSettings" *ngFor="#segmentTypeSetting of segmentTypeSettings.getSettings()">
      <booleanSegmentTypeSetting
        *ngIf="isBooleanSegmentTypeSetting(segmentTypeSetting)"
        [segmentTypeSetting]="segmentTypeSetting">
      </booleanSegmentTypeSetting>
      <stringSegmentTypeSetting
        *ngIf="isStringSegmentTypeSetting(segmentTypeSetting)"
        [segmentTypeSetting]="segmentTypeSetting">
      </stringSegmentTypeSetting>
      <dropdownSegmentTypeSetting
        *ngIf="isDropdownSegmentTypeSetting(segmentTypeSetting)"
        [segmentTypeSetting]="segmentTypeSetting">
      </dropdownSegmentTypeSetting>
    </div>
  `,
})
export class SegmentTypeSettingsComponent {
  // Angular only methods
  /* tslint:disable:no-unused-variable */
  private isBooleanSegmentTypeSetting(segmentTypeSetting: SegmentTypeSetting): boolean {
    return segmentTypeSetting instanceof BooleanSegmentTypeSetting;
  }

  private isStringSegmentTypeSetting(segmentTypeSetting: SegmentTypeSetting): boolean {
    return segmentTypeSetting instanceof StringSegmentTypeSetting;
  }

  private isDropdownSegmentTypeSetting(segmentTypeSetting: SegmentTypeSetting): boolean {
    return segmentTypeSetting instanceof DropdownSegmentTypeSetting;
  }
}
