import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { oneLine} from 'common-tags';

export default class StartCommand extends Command {
  constructor() {
    super('start', {
      aliases: ['start', 'register'],
      channel: 'guild',
      args: [
        {
          id: 'choice',
          type: ['warrior', 'rogue', 'mage', 'priest'],
          prompt: {
            start: oneLine`What path will you choose on your journey?  The scrappy \`Warrior\`, the wiley \`Rogue\`, 
            the ambitious \`Mage\`, or the wise \`Priest\`?`,
            retry: 'That is not a wise decision, please choose your path carefully.',
            retries: 2,
            ended: 'Come back when you\'re ready to make your choice.',
            cancel: 'Come back when you\'re ready to make your choice.',
            cancelWord: 'cancel'
          }
        }
      ]
    });
  }
  
  async exec(message: Message, { choice }: { choice: string }): Promise<Message | Message[]> {
    return await message.channel.send(`You chose the path of the ${choice}.`);
  }
}