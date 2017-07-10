import { SHORT_TIMEZONES, TIMEZONES } from "../../../common/timezones";
import {
    ISegmentType,
    SegmentTypeType,
} from "../segmentType";

export enum TimezoneStyle {
    Hour, // +-XX
    HourMinute, // +-XXXX (Z Default)
    HourMinuteSeparated, // +-XX:XX
    Short, // GMT
    Long, // America/Pacific
}

export interface ITimezoneSegmentType extends ISegmentType {
    __type__: SegmentTypeType.TIMEZONE;
    style: TimezoneStyle;
}

export function parseTimezoneSegmentType(token: string): ITimezoneSegmentType {
    let valid = true;
    let style: TimezoneStyle;
    if (/^[-+]\d{2}$/.test(token)) {
        style = TimezoneStyle.Hour;
    } else if (token.toLowerCase() === "z" || /^[-+]\d{4}$/.test(token)) {
        style = TimezoneStyle.HourMinute;
    } else if (/^[-+]\d\d:\d\d$/.test(token)) {
        style = TimezoneStyle.HourMinuteSeparated;
    } else if (SHORT_TIMEZONES.indexOf(token.toLowerCase()) !== -1) {
        style = TimezoneStyle.Short;
    } else if (TIMEZONES.indexOf(token.toLowerCase()) !== -1) {
        style = TimezoneStyle.Long;
    } else {
        valid = false;
    }
    return {
        __type__: SegmentTypeType.TIMEZONE,
        style,
        valid,
    };
}
