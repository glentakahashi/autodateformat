///<reference path="../typings/react/react-global.d.ts" />
///<reference path='./interfaces.d.ts'/>

abstract class DateFormat extends React.Component<IDateFormatProps, {}> {
  tokens: string[];

  constructor(props: IDateFormatProps) {
    super(props);
  }

  public render() {
    return <div>{this.constructor["name"]}</div>;
  }
}
