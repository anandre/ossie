import { Armor } from '../../common/equipment';

export default class LeatherTunic extends Armor {
  constructor() {
    super(null, {
      name: 'leather tunic',
      id: 'leathertunic'
    });
  }
}