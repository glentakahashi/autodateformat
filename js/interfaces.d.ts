///<reference path='./SegmentTypeSettings.tsx'/>
///<reference path='./SegmentType.tsx'/>
///<reference path='./Segment.tsx'/>
///<reference path='./DateFormat.tsx'/>

// SegmentTypeSettingView

interface IDropdownSegmentTypeSettingViewProps {
  segmentTypeSetting: DropdownSegmentTypeSetting;
}

interface ISegmentTypeSettingViewProps {
  segmentTypeSetting: SegmentTypeSetting;
}

// SegmentTypeSettingsView

interface ISegmentTypeSettingsViewProps {
  segmentTypeSettings: SegmentTypeSettings;
}

// SegmentTypeView

interface ISegmentTypeViewProps {
  defaultEnabled?: boolean;
  selected: boolean;
  segmentType: SegmentType;
}

interface ISegmentTypeViewState {
  enabled: boolean;
}

// SegmentView

interface ISegmentViewProps {
  defaultSelected?: typeof SegmentType;
  segment: Segment;
}

interface ISegmentViewState {
  selected: typeof SegmentType;
}

// DateFormat

interface IDateFormatProps {
  segments: Segment[];
}

// DateTime

interface IDateTimeProps {
  datetimeString: string;
}

// Converter

interface IConverterState {
  value: string;
}
