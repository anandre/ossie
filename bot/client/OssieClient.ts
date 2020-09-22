import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from 'discord-akairo';

export default class OssieClient extends AkairoClient {
  public constructor() {
    super({
      ownerID: '167988857046827010'
    });
  }

  public commandHandler = new CommandHandler(this, {
    directory: './bot/commands/',
    prefix: '??',
    automateCategories: true
  })

  public listenerHandler = new ListenerHandler(this, {
    directory: './bot/listeners/'
  })

  public inhibitorHandler = new InhibitorHandler(this, {
    directory: './bot/inhibitors/'
  })

  private load(): void {
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.commandHandler.loadAll();
    this.inhibitorHandler.loadAll();
    this.listenerHandler.loadAll();
  }

  public async start(token: string): Promise<string> {
    this.load();
    return await this.login(token);
  }
}
