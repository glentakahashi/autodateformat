///<reference path="../typings/react/react-global.d.ts" />
///<reference path='./interfaces.d.ts'/>
///<reference path='./Utils.ts'/>
///<reference path='./SegmentTypeView.tsx'/>

class SegmentView extends React.Component<ISegmentViewProps, ISegmentViewState> {
  constructor(props: ISegmentViewProps) {
    super(props);
    this.buildSegmentTypeView = this.buildSegmentTypeView.bind(this);
    this.state = {
      selected: props.segment.getSelected()
    };
  }

  private buildSegmentTypeView(segmentType) {
    return <SegmentTypeView onClick={this.handleClick} segmentType={segmentType} selected={segmentType === this.state.selected}/>;
  }

  private handleClick(e) {
  }

  // override
  public render() {
    return (
      <div>
        <div>
          {this.props.segment.getToken()}
        </div>
        <div>
          {this.props.segment.getEnabledTypes().map(this.buildSegmentTypeView)}
        </div>
        <br/>
      </div>
    );
  }
}
