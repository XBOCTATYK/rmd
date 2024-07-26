import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import addMilliseconds from 'date-fns/addMilliseconds';
import addMinutes from 'date-fns/addMinutes';
import addMonths from 'date-fns/addMonths';
import addSeconds from 'date-fns/addSeconds';
import addYears from 'date-fns/addYears';
import closest from 'date-fns/closestTo';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import parse from 'date-fns/parse';
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes';
import startOfDay from 'date-fns/startOfDay';

import {DATE_FNS_OPTIONS, DATE_FORMAT} from '../formats/formats';
import {DateTypes} from './date-services.types';
import {Difference} from './difference';
import {IExtendedDate} from './extended-date.interface';

/**
 * Расширенный класс для работы с датами. Связка date-fns с приложением.
 */
export class ExtendedDate implements IExtendedDate {
  value: Date;
  options = DATE_FNS_OPTIONS;
  formatting: string | undefined;

  static of(date: DateTypes, format?: string, options = DATE_FNS_OPTIONS): ExtendedDate {
    if (typeof date === 'string') {
      return new ExtendedDate(ExtendedDate.parse(date, format, options));
    }

    if (date instanceof ExtendedDate) {
      return date;
    }

    const newDate = new ExtendedDate(date);

    if (newDate.toString() === 'Invalid Date') {
      return new ExtendedDate(ExtendedDate.parse(date.toString(), format, options));
    }

    return newDate;
  }

  constructor(date: DateTypes, format?: string, options = DATE_FNS_OPTIONS) {
    if (typeof date === 'string') {
      this.value = ExtendedDate.parse(date, format, options);
    } else {
      this.value = (date instanceof ExtendedDate) ? date.get() : date as Date;
    }

    this.formatting = format;
    this.options = options;
  }

  static parse(value: string, format: string = DATE_FORMAT, options = DATE_FNS_OPTIONS) {
    return parse(value, format, 0, options);
  }

  addMilliseconds(amount: number) {
    return ExtendedDate.of(addMilliseconds(this.value, amount));
  }

  addSeconds(amount: number) {
    return ExtendedDate.of(addSeconds(this.value, amount));
  }

  addMinutes(amount: number) {
    return ExtendedDate.of(addMinutes(this.value, amount));
  }

  addHours(amount: number) {
    return ExtendedDate.of(addHours(this.value, amount));
  }

  addDays(amount: number) {
    return ExtendedDate.of(addDays(this.value, amount));
  }

  addMonths(amount: number) {
    return ExtendedDate.of(addMonths(this.value, amount));
  }

  addYears(amount: number) {
    return ExtendedDate.of(addYears(this.value, amount));
  }

  startOfDay() {
    return ExtendedDate.of(startOfDay(this.value));
  }

  isBeforeThan(date: DateTypes) {
    return isBefore(this.value, ExtendedDate.of(date, this.formatting).get());
  }

  isAfterThan(date: DateTypes) {
    return isAfter(this.value, ExtendedDate.of(date, this.formatting).get());
  }

  format(formatStr: string) {
    return format(this.value, formatStr, this.options);
  }

  roundToMinutes() {
    return ExtendedDate.of(roundToNearestMinutes(this.value));
  }

  closest(dates: (ExtendedDate | Date)[]) {
    const resultDates = dates.map((date) => {
      if (date instanceof ExtendedDate) {
        return date.value;
      }

      return date;
    });

    return ExtendedDate.of(closest(this.value, resultDates)!);
  }

  get() {
    return new Date(this.value);
  }

  difference(date: DateTypes) {
    return Difference.of(ExtendedDate.of(this.value), ExtendedDate.of(date));
  }

  valueOf() {
    return this.value.getTime();
  }

  toString() {
    return this.value.toString();
  }
}

/**
 *  Класс, если нужно только показатель времени
 */
export class Time extends ExtendedDate {
  static clearDate(date: DateTypes) {
    const startOfDate = (ExtendedDate.of(date, 'HH:mm').startOfDay());
    const minutesToTime = (startOfDate.difference(ExtendedDate.of(date, 'HH:mm'))).inMinutes();
    const clearedTime = (ExtendedDate.of(new Date(0)));

    return clearedTime.addMinutes(minutesToTime);
  }

  static of(date: DateTypes): ExtendedDate {
    const clearedTime = this.clearDate(date);

    return super.of(clearedTime, 'HH:mm');
  }

  constructor(date: Date | ExtendedDate) {
    const clearedTime = Time.clearDate(date);
    super(clearedTime, 'HH:mm');
  }

  isBeforeThan(date: ExtendedDate | Date | string) {
    return isBefore(this.value, Time.of(date).get());
  }

  isAfterThan(date: ExtendedDate | Date | string) {
    return isAfter(this.value, Time.of(date).get());
  }

  difference(date: ExtendedDate | Date | string) {
    return Difference.of(ExtendedDate.of(this.value), Time.of(date));
  }

  valueOf() {
    return this.value.getTime();
  }
}
