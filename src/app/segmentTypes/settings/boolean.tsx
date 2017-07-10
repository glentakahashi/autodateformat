import { ISegmentTypeSettingProps } from "./segmentTypeSetting";

import * as React from 'react';

export class BooleanSegmentTypeSetting extends React.Component<ISegmentTypeSettingProps<boolean>, {}> {
    public render() {
        const { value, label, helpText } = this.props;
        return (<div>
            <label title={helpText}>
                <input
                    checked={value}
                    className="segment-type-setting boolean-setting"
                    type='checkbox'
                    onChange={this.handleSelect}
                />
                {label}
            </label>
        </div>);
    }

    private handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { setValue } = this.props;
        setValue(event.target.checked);
    }
}
