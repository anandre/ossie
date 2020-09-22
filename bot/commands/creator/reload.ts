import { Command } from 'discord-akairo';
import { Message, MessageReaction } from 'discord.js';

export default class ReloadCommand extends Command {
  constructor() {
    super('reload', {
      aliases: ['reload', 're'],
      ownerOnly: true,
      clientPermissions: 'ADD_REACTIONS',
      args: [
        {
          id: 'command',
          match: 'rest'
        }
      ]
    });
  }

  async exec(message: Message, { command }: { command: string }): Promise<MessageReaction> {
    if (!this.handler.modules.has(command)) {
      return await message.react('❌');
    }
    this.handler.reload(command);
    return await message.react('✅');
  }
}