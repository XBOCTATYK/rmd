import {AppModule} from "../../types/AppModule";

export class TelegramModule implements AppModule<any, any> {
    init(config: any) {
        console.log('TelegramModule initialized')
        return this
    }

    start() {
        console.log('TelegramModule started')
    }

    stop() {
        console.log('TelegramModule stopped')
    }

    exports() { return {} };
}