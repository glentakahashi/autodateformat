///<reference path="../typings/react/react-global.d.ts" />
///<reference path='./interfaces.d.ts'/>
///<reference path='./SegmentTypeSettings.tsx'/>
///<reference path='./SegmentTypeSettingView.tsx'/>

// TODO: refactor getters and setters to have more consistent names

class SegmentTypeSettingsView extends React.Component<ISegmentTypeSettingsViewProps, {}> {

  constructor(props: ISegmentTypeSettingsViewProps) {
    super(props);
  }

  public render() {
    function buildSegmentTypeSettingViews(segmentTypeSetting) {
      if (segmentTypeSetting instanceof BooleanSegmentTypeSetting) {
        return <BooleanSegmentTypeSettingView segmentTypeSetting={segmentTypeSetting}/>;
      }
      if (segmentTypeSetting instanceof StringSegmentTypeSetting) {
        return <StringSegmentTypeSettingView segmentTypeSetting={segmentTypeSetting}/>;
      }
      if (segmentTypeSetting instanceof DropdownSegmentTypeSetting) {
        return <DropdownSegmentTypeSettingView segmentTypeSetting={segmentTypeSetting}/>;
      }
      throw new RangeError("Found setting that had no corresponding view");
    }
    return (
      <div>
        {this.props.segmentTypeSettings.getSettings().map(buildSegmentTypeSettingViews)}
      </div>
    );
  }
}
