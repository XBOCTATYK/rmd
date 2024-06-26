import {Difference} from './difference';

export interface IExtendedDate {

    addMilliseconds(amount: number): IExtendedDate

    addSeconds(amount: number): IExtendedDate

    addMinutes(amount: number): IExtendedDate

    addHours(amount: number): IExtendedDate

    addDays(amount: number): IExtendedDate

    addMonths(amount: number): IExtendedDate

    addYears(amount: number): IExtendedDate

    startOfDay(): IExtendedDate

    format(formatStr: string): string

    get(): Date

    difference(date: Date): Difference

    isBeforeThan(date: Date): boolean

    isAfterThan(date: Date): boolean

    roundToMinutes(): IExtendedDate

    closest(date: (IExtendedDate | Date)[]): IExtendedDate

    valueOf(): number
}
