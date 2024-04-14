import {Context, Markup} from 'telegraf';
import {InlineKeyboardMarkup} from 'telegraf/src/core/types/typegram';
import {NotificationDto} from '../../../scheduling';
import {NotificationAnswer} from '../../model/NotificationAnswer';
import {ITelegramControl} from '../../telegram.types';

export interface INotificationControl extends ITelegramControl<NotificationDto> {
    getControls: (notification: NotificationDto) => Markup.Markup<InlineKeyboardMarkup>

    getControlsHandler: (ctx: Context) => NotificationAnswer
}
