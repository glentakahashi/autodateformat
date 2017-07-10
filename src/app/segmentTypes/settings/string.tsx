
import { ISegmentTypeSettingProps } from "./segmentTypeSetting";

import * as React from 'react';

export interface IStringSegmentTypeSettingOwnProps {
    placeholder?: string;
}

declare type IStringSegmentTypeSettingProps = IStringSegmentTypeSettingOwnProps & ISegmentTypeSettingProps<string>;

export class StringSegmentTypeSetting extends React.Component<IStringSegmentTypeSettingProps, {}> {
    public render() {
        const { value, label, helpText } = this.props;
        return (<div>
            <label title={helpText}>
                <input
                    value={value}
                    className="segment-type-setting string-setting"
                    type='text'
                    onChange={this.handleSelect}
                />
                {label}
            </label>
        </div>);
    }

    private handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { setValue } = this.props;
        setValue(event.target.value);
    }
}
