import { Weapon } from '../../common/equipment';

export default class IronDagger extends Weapon {
  constructor() {
    super(null, {
      id: 'irondagger',
      name: 'iron dagger',
      damage: 3
    });
  }
}