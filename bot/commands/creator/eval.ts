import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { stripIndents } from 'common-tags';
import { inspect } from 'util';

export default class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval', 'ev'],
      ownerOnly: true,
      clientPermissions: 'EMBED_LINKS',
      args: [
        {
          id: 'code',
          match: 'rest'
        }
      ]
    });
  }

  async exec(message: Message, { code }: { code: string }): Promise<Message | Message[]> {
    let evaled;
    const start = Date.now();
		let type;
		try {
			evaled = eval(code); 
			type = typeof evaled;
			if (evaled !== null && typeof evaled.then === 'function') evaled = await evaled;
			if (typeof evaled === 'object') {
				evaled = inspect(evaled, {
					depth: 0,
				});
			}
		} catch (err) {
			return message.channel.send(stripIndents`
        An error occured!
        \`\`\`xl\n${err}
        \`\`\`
     `);
		}
		const end = Date.now();
		if (!evaled) {
			await message.react('🤷‍').catch(() => message);
			return message;
		}
		if (evaled.length > 1500) {
			evaled = 'Response too long.';
		}
		return message.channel.send(stripIndents`
      **Output**:
      \`\`\`js\n${evaled}
      \`\`\`
      **Type**:
      \`\`\`js\n${type}
      \`\`\`
      ⏱ ${end - start}ms`);
  }
}