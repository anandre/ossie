import { Accessory } from '../../common/equipment';

export default class WarriorPendant extends Accessory {
  constructor() {
    super(null, {
      name: 'warrior\'s pendant',
      id: 'warriorpendant'
    });
  }
}