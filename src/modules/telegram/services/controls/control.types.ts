import {Context, Markup} from 'telegraf';
import {InlineKeyboardMarkup} from 'telegraf/src/core/types/typegram';
import {NotificationAnswer} from '../../model';
import {ITelegramControl} from '../../telegram.types';

export interface INotificationControl extends ITelegramControl<number> {
    getControls: (notificationId: number) => Markup.Markup<InlineKeyboardMarkup>

    getControlsHandler: (ctx: Context) => NotificationAnswer
}
