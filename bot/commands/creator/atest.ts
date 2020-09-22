import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import Warrior from '../../../data/paths/Warrior';

export default class ATestCommand extends Command {
  constructor() {
    super('atest', {
      aliases: ['atest'],
      ownerOnly: true
    });
  }

  public async exec(message: Message): Promise<void> {
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
    await path.setWeapon();
    message.channel.send(path.weapon!.name);
    message.channel.send(path.weapon!.calculateDamage('_agi'));
  }
}