import { Accessory, FullOpts } from '../../common/equipment';

export const stats: FullOpts = {
  name: 'warrior\'s pendant',
  id: 'warriorpendant'
};

export default class WarriorPendant extends Accessory {
  constructor() {
    super(stats);
  }
}