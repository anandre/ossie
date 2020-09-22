import { Path, PathStats } from '../common/path';

export default class Warrior extends Path {
  constructor(stats: PathStats) {
    super(stats);

    this.speed = 2;
  }

  public path = 'Warrior';
}

