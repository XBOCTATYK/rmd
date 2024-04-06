import {IMessageMapper} from '../../telegram.types';

export class DateMapper implements IMessageMapper {
  map(message: string): string {
    const lowered = message.toLowerCase();

    if (lowered.includes('tomorrow')) {
      return new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    }

    if (lowered.includes('today')) {
      return new Date(Date.now()).toISOString();
    }

    if (lowered.match(/in \d+ days/)) {
      const days = Number(lowered.match(/in (\d+) days/)?.[1]);
      return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
    }

    if (lowered.match(/in \d+ hours/)) {
      const hours = Number(lowered.match(/in (\d+) hours/)?.[1]);
      return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
    }

    if (lowered.match(/in \d+ minutes/)) {
      const minutes = Number(lowered.match(/in (\d+) minutes/)?.[1]);
      return new Date(Date.now() + minutes * 60 * 1000).toISOString();
    }

    return new Date(Date.parse(lowered)).toISOString();
  }

  validate(message: string): boolean {
    return !!message;
  }
}
