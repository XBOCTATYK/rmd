import {Context, Markup} from 'telegraf';
import {CallbackQuery, InlineKeyboardMarkup} from 'telegraf/src/core/types/typegram';
import {callback} from 'telegraf/typings/button';
import {NotificationDto} from '../../../scheduling';
import {InvalidQueryError} from '../../exceptions';
import {NotificationAnswer} from '../../model';
import {ENotificationAnswerType} from '../../model/enums/ENotificationAnswerType';

import {INotificationControl} from './control.types';


// TODO: eject to adapter
export enum ETelegramQueryAnswerType {
    FORGOT = 'Forgot',
    REMEMBER = 'Remember',
    DONE = 'Done',
}

const QUERY_BUTTON_DESCRIPTIONS_MAP = {
  [ETelegramQueryAnswerType.FORGOT]: 'Forgot',
  [ETelegramQueryAnswerType.REMEMBER]: 'I remember',
  [ETelegramQueryAnswerType.DONE]: 'Task is done',
} as const;

const REPLIES_MAP = {
  [ETelegramQueryAnswerType.FORGOT]: 'I will remind you one more time',
  [ETelegramQueryAnswerType.REMEMBER]: 'Okay',
  [ETelegramQueryAnswerType.DONE]: 'Well done!',
} as const;

const NOTIFICATION_ANSWER_MAP = {
  [ETelegramQueryAnswerType.FORGOT]: ENotificationAnswerType.FORGOT,
  [ETelegramQueryAnswerType.REMEMBER]: ENotificationAnswerType.REMEMBER,
  [ETelegramQueryAnswerType.DONE]: ENotificationAnswerType.DONE,
} as const;

export class NotificationAnswerControl implements INotificationControl {
  public getControls(notification: NotificationDto): Markup.Markup<InlineKeyboardMarkup> {
    const message = `${notification.id}`;
    return Markup.inlineKeyboard([
      callback(QUERY_BUTTON_DESCRIPTIONS_MAP[ETelegramQueryAnswerType.FORGOT], `${message}/${ETelegramQueryAnswerType.FORGOT}`),
      callback(QUERY_BUTTON_DESCRIPTIONS_MAP[ETelegramQueryAnswerType.REMEMBER], `${message}/${ETelegramQueryAnswerType.REMEMBER}`),
      callback(QUERY_BUTTON_DESCRIPTIONS_MAP[ETelegramQueryAnswerType.DONE], `${message}/${ETelegramQueryAnswerType.DONE}`),
    ]);
  }

  public getControlsHandler(ctx: Context): NotificationAnswer {
    const data = (ctx.callbackQuery as CallbackQuery.DataQuery)?.data?.split('/') ?? [];
    const [notificationId, answer] = data;

    if (!notificationId || !answer) {
      throw new InvalidQueryError(data);
    }

    ctx.reply(REPLIES_MAP[answer as ETelegramQueryAnswerType]).then();

    return new NotificationAnswer(
        Number(notificationId),
        this.mapToNotificationAnswer(answer as ETelegramQueryAnswerType)
    );
  }

  private mapToNotificationAnswer(string: ETelegramQueryAnswerType): NotificationAnswer['answer'] {
    return NOTIFICATION_ANSWER_MAP[string] ?? ENotificationAnswerType.NO_ANSWER;
  }
}
