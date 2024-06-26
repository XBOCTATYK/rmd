import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInDays from 'date-fns/differenceInDays';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInYears from 'date-fns/differenceInYears';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';

import {ExtendedDate} from './extended-date';
import {IDifference} from './dirrerence.interface';
import {IExtendedDate} from './extended-date.interface';
import {DateTypes} from './date-services.types';

export class Difference implements IDifference {
  from: IExtendedDate;
  to: IExtendedDate;
  private readonly diff: number = 0;

  static of(date1: DateTypes, date2: DateTypes) {
    return new Difference(date1, date2);
  }

  constructor(date1: DateTypes | Difference, date2?: DateTypes) {
    if (!date1) {
      this.from = ExtendedDate.of(new Date(0));
      this.to = ExtendedDate.of(new Date(0));
    }

    if (date1 instanceof Difference) {
      this.from = date1.dateFrom();
      this.to = date1.dateTo();

      return;
    }

    if (!date2) {
      this.from = ExtendedDate.of(new Date(0));
      this.to = ExtendedDate.of(date1);

      return;
    }

    this.from = ExtendedDate.of(date1);
    this.to = ExtendedDate.of(date2);

    // Swap values if right date rather than left
    if (this.to < this.from) {
      const temp = this.to;

      this.to = this.from;
      this.from = temp;
    }

    this.diff = differenceInMilliseconds(this.to.get(), this.from.get());
  }

  inMinutes() {
    return differenceInMinutes(this.to.get(), this.from.get());
  }

  inHours() {
    return differenceInHours(this.to.get(), this.from.get());
  }

  inDays() {
    return differenceInDays(this.to.get(), this.from.get());
  }

  inMonths() {
    return differenceInMonths(this.to.get(), this.from.get());
  }

  inYears() {
    return differenceInYears(this.to.get(), this.from.get());
  }

  get() {
    return new Date(this.diff);
  }

  addMilliseconds(amount: number) {
    this.to = this.to.addMilliseconds(amount);
    return this;
  }

  addSeconds(amount: number) {
    this.to = this.to.addSeconds(amount);
    return this;
  }

  addMinutes(amount: number) {
    this.to = this.to.addMinutes(amount);
    return this;
  }

  addHours(amount: number) {
    this.to = this.to.addHours(amount);
    return this;
  }

  addDays(amount: number) {
    this.to = this.to.addDays(amount);
    return this;
  }

  addMonths(amount: number) {
    this.to = this.to.addMonths(amount);
    return this;
  }

  addYears(amount: number) {
    this.to = this.to.addYears(amount);
    return this;
  }

  dateFrom() {
    return this.from;
  }

  dateTo() {
    return this.to;
  }

  intersection(diffObj: Difference) {
    let dateTo;
    let dateFrom;

    if (diffObj.dateFrom() > this.dateFrom()) {
      dateFrom = diffObj.dateFrom();
    } else {
      dateFrom = this.dateFrom();
    }

    if (diffObj.dateTo() < this.dateTo()) {
      dateTo = diffObj.dateTo();
    } else {
      dateTo = this.dateTo();
    }

    return Difference.of(dateFrom, dateTo);
  }

  union(diffObj: Difference) {
    let dateTo;
    let dateFrom;

    if (diffObj.dateFrom() > this.dateFrom()) {
      dateFrom = diffObj.dateFrom();
    } else {
      dateFrom = this.dateFrom();
    }

    if (diffObj.dateTo() < this.dateTo()) {
      dateTo = diffObj.dateTo();
    } else {
      dateTo = this.dateTo();
    }

    return Difference.of(dateFrom, dateTo);
  }

  valueOf() {
    return this.diff;
  }
}
