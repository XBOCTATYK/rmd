import {ESchedulingEventsType, SchedulingEvents} from '../../common/databus/schedulingMessaging.types';

export function helloListener() {
  return async function(event: SchedulingEvents) {
    if (event.type === ESchedulingEventsType.HELLO) {
      console.log(event.data);
    }
  };
}
