import {IExtendedDate} from './extended-date.interface';

export interface IDifference {
    from: IExtendedDate;
    to: IExtendedDate;

    inMinutes(): number;

    inHours(): number;

    inDays(): number;

    inMonths(): number;

    inYears(): number;

    addMilliseconds(amount: number): this

    addSeconds(amount: number): this

    addMinutes(amount: number): this

    addHours(amount: number): this

    addDays(amount: number): this

    addMonths(amount: number): this

    addYears(amount: number): this

    intersection(diffObj: IDifference): IDifference

    union(diffObj: IDifference): IDifference

    dateFrom(): IExtendedDate

    dateTo(): IExtendedDate

    get(): Date

    valueOf(): number
}
