import { ISegmentTypeSettingProps } from "./segmentTypeSetting";

import * as React from 'react';

export interface IDropdownSegmentTypeSettingOwnProps {
    possibleValues: { [id: string]: string };
}

declare type IDropdownSegmentTypeSettingProps = IDropdownSegmentTypeSettingOwnProps & ISegmentTypeSettingProps<string>;

export class DropdownSegmentTypeSetting extends React.Component<IDropdownSegmentTypeSettingProps, {}> {
    public render() {
        const { value, label, helpText, possibleValues } = this.props;
        return (<div>
            <label title={helpText}>{label}</label>
            <select
                className="segment-type-setting dropdown-setting"
                onChange={this.handleSelect}
                value={value}
            >
                {Object.keys(possibleValues).map((key) => {
                    <option value={possibleValues[key]}>
                        {key}
                    </option>
                })}
            </select>
        </div>);
    }

    private handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { setValue } = this.props;
        setValue(event.target.value);
    }
}
