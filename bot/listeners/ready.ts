import { Listener } from 'discord-akairo';

export default class ReadyEvent extends Listener {
  public constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  public exec(): void {
    console.log('Coming online...');
  }
}