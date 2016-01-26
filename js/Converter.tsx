///<reference path="../typings/react/react-global.d.ts" />
///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path='./DateTime.tsx'/>

class Converter extends React.Component<{}, IConverterState> {

  constructor(props: {}) {
    super(props);
    // XXX:annoying, and it seems like there should be a better way of solving this
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.state = {
      value: this.testDates[this.getRandomInt(0, this.testDates.length)]
    };
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private testDates: string[] = [
    "Sun, 29 Feb 2004 16:21:42 -0800",
    "Wednesday 16th October 2013 19:00 CET",
    "Sunday, 29 February 2004 16:21:42 -0800",
    "2004-02-29 16:21:42",
    "1997-07-16T19:20:30+01:00",
    "1997-07-16T19:20:30",
    "1997-07-16T19:20+01:00",
    "1997-07-16T19:20",
    "1997-07-07T19:20:30+01:00",
    "1997-07-07T192030+01:00",
    "1997-07-07T192030+0100",
    "1997-07-07 192030+0100",
    "11/11/11",
    "11/11/2011",
    "11.11.2011",
    "11/11/2011 01:03:45.1203",
    "11/11/2011 01:03:45.1203Z",
    "11/11/2011 01:03:45.1203 GMT",
    "10230810",
  ];

  private handleClick(e) {
    this.setState({
      value: $(".date", e.nativeEvent.srcElement.parentElement).val()
    });
  }

  private handleClick2(e) {
    $(".date", e.nativeEvent.srcElement.parentElement).val(this.testDates[this.getRandomInt(0, this.testDates.length)]);
  }

  public render() {
    return (
      <div>
        <div>
          <input className="date" type="text" defaultValue={this.state.value}/>
          <button className="btn" onClick={this.handleClick}>Convert</button>
          <button className="btn" onClick={this.handleClick2}>Random</button>
        </div>
        <div>
          <DateTime datetimeString={this.state.value}/>
        </div>
      </div>
    );
  }
}
