import { Weapon, FullOpts } from '../../common/equipment';

export const stats: FullOpts = {
  id: 'irondagger',
  name: 'iron dagger',
  damage: 3,
  str: 2,
  agi: 1,
  acc: 5
};

export default class IronDagger extends Weapon {
  constructor(stats: FullOpts) {
    super(stats);
  }
}