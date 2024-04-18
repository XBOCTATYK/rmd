import {SchedulingEvents} from '../../common/databus/schedulingMessaging.types';

export function helloListener() {
  return async function(event: SchedulingEvents) {
    if (event.type === 'hello') {
      console.log(event.data);
    }
  };
}
