import {isSameDay, setDefaultOptions} from 'date-fns';
import addMinutes from 'date-fns/addMinutes';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import {DATE_FNS_OPTIONS, DATE_FORMAT} from './formats/formats';

const MINS_IN_DAY = 1440;
setDefaultOptions(DATE_FNS_OPTIONS);

function getRange(fromTime: Date, toTime: Date): { fromInMinutes: number, toInMinutes: number } {
  const fromInMinutes = differenceInMinutes(fromTime, startOfDay(fromTime));
  const toInMinutes = differenceInMinutes(toTime, startOfDay(fromTime));

  return {fromInMinutes, toInMinutes};
}

function getTaskToday(dateTime: Date, taskDate: Date) {
  return isSameDay(dateTime, taskDate) ? differenceInMinutes(taskDate, startOfDay(taskDate)) : null;
}

function getAvailableTime(from: Date, to: Date, dateTime: Date): Date {
  const dayStart = startOfDay(dateTime);
  const currentPoint = differenceInMinutes(dateTime, dayStart);
  const {fromInMinutes, toInMinutes} = getRange(from, to);
  const taskToday = getTaskToday(dateTime, dateTime);

  const sizeWorkingDayInMinutes = MINS_IN_DAY - (MINS_IN_DAY - (taskToday ?? toInMinutes)) - fromInMinutes;
  const ratio = sizeWorkingDayInMinutes/MINS_IN_DAY;
  const newPoint = Math.round((currentPoint)*ratio);
  const resultOffset = fromInMinutes + newPoint;

  return addMinutes(dayStart, resultOffset);
}

function notifyTimes(date1: Date, date2: Date, notifyCount: number): Date[] {
  const diffInMinutes = differenceInMinutes(date2, date1);

  const resultArr = [];
  const notifyOffset = diffInMinutes/notifyCount;
  let offset = diffInMinutes;

  for (let index = 0; index < notifyCount; index++) {
    const notifyLeft = notifyCount - index;
    offset -= notifyOffset*((notifyCount/2)/(notifyLeft*2));

    resultArr.push(addMinutes(date1, Math.round(offset)));
  }

  return resultArr.reverse();
}

function checkInWorkRange(from: Date, to: Date, dateTime: Date): boolean {
  const dayStart = startOfDay(dateTime);
  const currentPoint = differenceInMinutes(dateTime, dayStart);
  const {fromInMinutes, toInMinutes} = getRange(from, to);

  return currentPoint >= fromInMinutes && currentPoint <= toInMinutes;
}

function notifyTimesInNearDayWithWorkingHours(notifyTimes: Date[], from: Date, to: Date): Date[] {
  const nearestDay = format(notifyTimes[0], DATE_FORMAT);
  const notifiesInNearestDay = notifyTimes.filter( (date) => format(date, DATE_FORMAT) === nearestDay );

  const allNotifiesInRange = notifiesInNearestDay.every( (date) => checkInWorkRange(from, to, date));

  return !allNotifiesInRange ?
        notifiesInNearestDay.map( (date) => getAvailableTime(from, to, date)) :
        notifiesInNearestDay;
}

export function getNextNotifyTime(
    user: { startTime: Date, endTime: Date },
    task: { dueDate: Date, notificationsNeed: number }
): Date {
  const dateNow = new Date();
  const nextNotificationsTimes = notifyTimes(dateNow, task.dueDate, task.notificationsNeed);

  return nextNotificationsTimes.length > 0 ?
    notifyTimesInNearDayWithWorkingHours(nextNotificationsTimes, user.startTime, user.endTime)[0] :
    task.dueDate;
}

