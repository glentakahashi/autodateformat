import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
    IDateTimeFormatAppState,
    ISegment,
    setDate,
} from "./state";

interface IStateProps {
    date: string;
    segments: ISegment[];
}

interface IDispatchProps {
    dispatchSetDate(data: string): void;
}

type IAppContainerProps = IStateProps & IDispatchProps;

interface IComponentState {
    date: string;
}

const SAMPLE_DATES = [
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
    "20120203-123443",
    "10230810",
];

/**
 * AppContainer
 *
 * Based on app state, will delegate to the corresponding views
 */
class UnconnectedAppContainer extends React.Component<IAppContainerProps, IComponentState> {
    constructor(props: IAppContainerProps) {
        super(props);
        this.state = {
            date: props.date,
        };
    }

    public render() {
        const { date } = this.state;
        /*<dateformat datetime="datetime"></dateformat>
        <datetime [datetime]="datetime"></datetime>*/
        return (
            <div className="converter">
                <div className="date-input">
                    <input value={date} className="date" type="text" />
                    <button className="btn" onClick={this.setDate}>Convert</button>
                    <button className="btn" onClick={this.setRandomDate}>Random</button>
                </div>
            </div>
        );
    }

    private setDate = () => {
        const { date } = this.state;
        const { dispatchSetDate } = this.props;
        dispatchSetDate(date);
    }

    private setRandomDate = () => {
        const { dispatchSetDate } = this.props;
        const newDate = SAMPLE_DATES[Math.floor(Math.random() * SAMPLE_DATES.length)];
        this.setState({
            date: newDate,
        });
        dispatchSetDate(newDate);
    }
}

function mapStateToProps(state: IDateTimeFormatAppState, _props: {}): IStateProps {
    const { segments, date } = state;

    return {
        date,
        segments,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IDateTimeFormatAppState>, _props: {}): IDispatchProps {
    return {
        dispatchSetDate: (date: string) => dispatch(setDate(date)),
    };
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(UnconnectedAppContainer);
