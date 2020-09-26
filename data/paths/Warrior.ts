import { Path, PathStats } from '../common/path';

export default class Warrior extends Path {
  constructor(stats: PathStats) {
    super(stats);
    
  }
  public path = 'Warrior';
  protected speed = 2;
}