const differenceInMinutes = require('date-fns/differenceInMinutes');
const format = require('date-fns/format');
const startOfDay = require('date-fns/startOfDay');
const {ru} = require('date-fns/locale');
const LOCALE = ru;

const addMinutes = require('date-fns/addMinutes');
const {setDefaultOptions, isToday, isSameDay} = require('date-fns');

const DATE_FNS_OPTIONS = {
  weekStartsOn: 1,
  timezone: 'Europe/Moscow',
  locale: LOCALE,
};
setDefaultOptions(DATE_FNS_OPTIONS);

const DATE_FORMAT = 'dd.MM.yyyy';

const MINS_IN_DAY = 1440;

function getRange(fromTime, toTime) {
  const fromInMinutes = differenceInMinutes(fromTime, startOfDay(fromTime));
  const toInMinutes = differenceInMinutes(toTime, startOfDay(fromTime));

  return {fromInMinutes, toInMinutes};
}

function getTaskToday(dateTime, taskDate) {
  return isSameDay(dateTime, taskDate) ? differenceInMinutes(taskDate, startOfDay(taskDate)) : null;
}

function getAvailableTime(from, to, dateTime, taskDate) {
  const dayStart = startOfDay(dateTime);
  const currentPoint = differenceInMinutes(dateTime, dayStart);
  const {fromInMinutes, toInMinutes} = getRange(from, to);
  const taskToday = getTaskToday(dateTime, taskDate);

  const sizeWorkingDayInMinutes = MINS_IN_DAY - (MINS_IN_DAY - (taskToday ?? toInMinutes)) - fromInMinutes;
  const ratio = sizeWorkingDayInMinutes/MINS_IN_DAY;
  const newPoint = Math.round((currentPoint)*ratio);
  const resultOffset = fromInMinutes + newPoint;

  return addMinutes(dayStart, resultOffset);
}

function notifyTimes(date1, date2, notifyCount) {
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

function checkInWorkRange(from, to, dateTime) {
  const dayStart = startOfDay(dateTime);
  const currentPoint = differenceInMinutes(dateTime, dayStart);
  const {fromInMinutes, toInMinutes} = getRange(from, to);

  return currentPoint >= fromInMinutes && currentPoint <= toInMinutes;
}

function notifyTimesInNearDayWithWorkingHours(notifyTimes, from, to, taskDate) {
  const nearestDay = format(notifyTimes[0], DATE_FORMAT);
  const notifiesInNearestDay = notifyTimes.filter( (date) => format(date, DATE_FORMAT) === nearestDay );

  const allNotifiesInRange = notifiesInNearestDay.every( (date) => {
    return checkInWorkRange(from, to, date);
  }, false);

  console.log('notifiesInNearestDay', notifiesInNearestDay);

  return !allNotifiesInRange ?
        notifiesInNearestDay.map( (date) => getAvailableTime(from, to, date, taskDate)) :
        notifiesInNearestDay;
}

function getNextNotifyTime(
    user,
    task
) {
  const dateNow = new Date();
  const nextNotificationsTimes = notifyTimes(dateNow, task.date, task.notificationsNeed);
  const result = notifyTimesInNearDayWithWorkingHours(nextNotificationsTimes, user.startTime, user.endTime, task.date);

  console.log('result', result);
  return result[0];
}

console.log(
    getNextNotifyTime(
        {startTime: new Date(Date.parse('1970-01-01T09:00+00:00')), endTime: new Date(Date.parse('1970-01-01T23:00+00:00'))},
        {date: new Date(Date.parse('2024-07-28T12:00+00:00')), notificationsNeed: 30}
    )
);
