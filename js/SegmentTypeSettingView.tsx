///<reference path="../typings/react/react-global.d.ts" />
///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path='./interfaces.d.ts'/>

class BooleanSegmentTypeSettingView extends React.Component<ISegmentTypeSettingViewProps, {}> {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  private handleChange(e: React.SyntheticEvent) {
    this.props.segmentTypeSetting.setValue($(e.nativeEvent.target).val());
  }

  public render() {
    return (
      <div>
        <label>{this.props.segmentTypeSetting.label}</label>
        <input type="checkbox" name={this.props.segmentTypeSetting.getName()} defaultValue={this.props.segmentTypeSetting.getValue()} onChange={this.handleChange}/>
      </div>
    );
  }
}

class StringSegmentTypeSettingView extends React.Component<ISegmentTypeSettingViewProps, {}> {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  private handleChange(e: React.SyntheticEvent) {
    this.props.segmentTypeSetting.setValue($(e.nativeEvent.target).val());
  }

  public render() {
    return (
      <div>
        <label>{this.props.segmentTypeSetting.label}</label>
        <input type="text" name={this.props.segmentTypeSetting.getName()} defaultValue={this.props.segmentTypeSetting.getValue()} onChange={this.handleChange}/>
      </div>
    );
  }
}

class DropdownSegmentTypeSettingView extends React.Component<IDropdownSegmentTypeSettingViewProps, {}> {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  private handleChange(e: React.SyntheticEvent) {
    this.props.segmentTypeSetting.setValue($(e.nativeEvent.target).val());
  }

  public render() {
    let choices = [];
    for (let name in this.props.segmentTypeSetting.getValues()) {
      let label = this.props.segmentTypeSetting.getValues()[name];
      choices.push(<option value={name}>{label}</option>);
    }
    return (
      <div>
        <label>{this.props.segmentTypeSetting.label}</label>
        <select name={this.props.segmentTypeSetting.getName()} defaultValue={this.props.segmentTypeSetting.getValue()} onChange={this.handleChange}>
          {choices}
        </select>
      </div>
    );
  }
}
