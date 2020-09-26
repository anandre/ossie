import { Armor, FullOpts } from '../../common/equipment';

export const stats: FullOpts = {
  name: 'leather tunic',
  id: 'leathertunic'
};

export default class LeatherTunic extends Armor {
  constructor() {
    super(stats);
  }
}