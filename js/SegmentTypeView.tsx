///<reference path="../typings/react/react-global.d.ts" />
///<reference path='./interfaces.d.ts'/>
///<reference path='./Utils.ts'/>
///<reference path='./Timezones.ts'/>
///<reference path='./SegmentTypeSettingsView.tsx'/>

// TODO: refactor getters and setters to have more consistent names

class SegmentTypeView extends React.Component<ISegmentTypeViewProps, ISegmentTypeViewState> {

  valid: boolean = false;
  enabled: boolean = true;
  settings: SegmentTypeSettings;

  // TODO: does this conflict with native name parameter in ES6?
  public static name: string;

  constructor(props: ISegmentTypeViewProps) {
    super(props);
    this.state = {
      enabled: props.defaultEnabled
    };
  }

  public render() {
    return (
      <div className={this.props.selected ? "selected" : null}>
        {this.props.segmentType.getName()}
        <div>
          <SegmentTypeSettingsView segmentTypeSettings={this.props.segmentType.getSettings()}/>
        </div>
      </div>
    );
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public enable() {
    this.enabled = true;
  }

  public disable() {
    this.enabled = false;
  }

  public isValid(): boolean {
    return this.valid;
  }

  public getName(): string {
    return this.constructor["name"];
  }
}
