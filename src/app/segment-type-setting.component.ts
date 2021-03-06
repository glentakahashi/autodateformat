import {Component} from 'angular2/core';
import {MapToIterable} from './map-to-iterable.directive';

@Component({
  inputs: ['segmentTypeSetting'],
  selector: 'booleanSegmentTypeSetting',
  template: `
    <input class="segmentTypeSetting booleanSetting" name="{{segmentTypeSetting.name}}" type='checkbox' placeholder="{{segmentTypeSetting.placeholder}}" [(ngModel)]="segmentTypeSetting.value">
    <label attr.for="{{segmentTypeSetting.name}}" attr.title="{{segmentTypeSetting.getHelpText()}}">{{segmentTypeSetting.label}}</label>
  `,
})
export class BooleanSegmentTypeSettingComponent {
}

@Component({
  inputs: ['segmentTypeSetting'],
  selector: 'stringSegmentTypeSetting',
  template: `
    <input class="segmentTypeSetting stringSetting" name="{{segmentTypeSetting.name}}" type='text' placeholder="{{segmentTypeSetting.placeholder}}" [(ngModel)]="segmentTypeSetting.value">
    <label attr.for="{{segmentTypeSetting.name}}" attr.title="{{segmentTypeSetting.getHelpText()}}">{{segmentTypeSetting.label}}</label>
  `,
})
export class StringSegmentTypeSettingComponent {
}

@Component({
  inputs: ['segmentTypeSetting'],
  pipes: [MapToIterable],
  selector: 'dropdownSegmentTypeSetting',
  template: `
    <label attr.title="{{segmentTypeSetting.getHelpText()}}">{{segmentTypeSetting.label}}</label>
    <select class="segmentTypeSetting dropdownSetting" [(ngModel)]="segmentTypeSetting.value">
      <option *ngFor="#possibleValue of segmentTypeSetting.possibleValues | mapToIterable" [value]="possibleValue.key">
        {{possibleValue.val}}
      </option>
    </select>
  `,
})
export class DropdownSegmentTypeSettingComponent {
}
