import { Status } from './status';
import { Path } from './path';

export abstract class Equipment {
  name: string;
  abstract slot: string;

  str: number;
  agi: number;
  con: number;
  mag: number;
  spr: number;

  hp: number;
  mp: number;
  acc: number;
  focus: number;
  tough: number;
  mind: number;
  dodge: number;
  resist: number;

  statuses: string[];
  id: string;

  wielder?: Path

  constructor(stats: FullOpts) {

    this.name = stats.name;
    this.id = stats.id;

    this.str = stats.str ?? 0;
    this.agi = stats.agi ?? 0;
    this.con = stats.con ?? 0;
    this.mag = stats.mag ?? 0;
    this.spr = stats.spr ?? 0;

    this.hp = stats.hp ?? 0;
    this.mp = stats.mp ?? 0;
    this.acc = stats.acc ?? 0;
    this.focus = stats.focus ?? 0;
    this.tough = stats.tough ?? 0;
    this.mind = stats.mind ?? 0;
    this.dodge = stats.dodge ?? 0;
    this.resist = stats.resist ?? 0;

    this.statuses = stats.statuses ?? [];

    this.wielder = stats.wielder ?? undefined;
  }

  public async setStatuses(): Promise<void> {
      for (const status of this.statuses) {
        const _imported = await import(`../statuses/${status}`);
        const imported = 'default' in _imported ? _imported.default : _imported;
        const res: Status = new imported();
        this.wielder?.statuses.push(res);
    }
  }
}

export abstract class Weapon extends Equipment {
  damage: number;
  
  constructor(stats: FullOpts) {
    super(stats);

    this.damage = stats.damage ?? 3;
  }

  public slot = 'weapon';

  public calculateDamage(stat: 'str' | 'agi' | 'mag'): number {
    return this.damage + Math.round(this.wielder!.level / 2) + Math.round(this.wielder![stat] / 3);
  }
}

export abstract class Armor extends Equipment {
  constructor(stats: FullOpts) {
    super(stats);
  }

  public slot = 'armor';
}

export abstract class Accessory extends Equipment {
  constructor(stats: FullOpts) {
    super(stats);
  }

  public slot = 'accessory';
}

type PathOpts = { wielder?: Path };
export type FullOpts = EquipStats & PathOpts;

export interface EquipStats {
  name: string;
  id: string;

  str?: number;
  agi?: number;
  con?: number;
  mag?: number;
  spr?: number;

  hp?: number;
  mp?: number;
  acc?: number;
  focus?: number;
  tough?: number;
  mind?: number;
  dodge?: number;
  resist?: number;

  damage?: number;

  statuses?: string[];
}