import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import Warrior from '../../../data/paths/Warrior';

export default class TestCommand extends Command {
  constructor() {
    super('test', {
      aliases: ['test'],
      ownerOnly: true
    });
  }

  exec(message: Message): void {
    const path: Warrior = new Warrior({
      id: message.author.id,
      name: message.author.username,
      level: 1,
      _str: 2,
      _agi: 1,
      _con: 3,
      _mag: 0,
      _spr: 1,
      weaponID: 'irondagger',
      armorID: 'leathertunic',
      accessoryID: 'warriorpendant'
    });
    message.channel.send(path.weapon!.name);
    message.channel.send(path.weapon!.calculateDamage('_agi'));
  }

  /* public async exec(message: Message): Promise<void> {
    
  } */
}