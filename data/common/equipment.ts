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

  statuses: string[];
  id: string;

  wielder: Path | null;

  constructor(wielder: Path | null, stats: EquipStats) {
    this.wielder = wielder;

    this.name = stats.name;
    this.id = stats.id;

    this.str = stats.str ? stats.str : 0;
    this.agi = stats.agi ? stats.agi : 0;
    this.con = stats.con ? stats.con : 0;
    this.mag = stats.mag ? stats.mag : 0;
    this.spr = stats.spr ? stats.spr : 0;

    this.hp = stats.hp ? stats.hp : 0;
    this.mp = stats.mp ? stats.mp : 0;
    this.acc = stats.acc ? stats.acc : 0;
    this.focus = stats.focus ? stats.focus : 0;
    this.tough = stats.tough ? stats.tough : 0;
    this.mind = stats.mind ? stats.mind : 0;

    this.statuses = stats.statuses ?? [];
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
  
  constructor(wielder: Path | null, stats: EquipStats) {
    super(wielder, stats);

    this.damage = stats.damage ? stats.damage : 3;
  }

  public slot = 'weapon';

  public calculateDamage(stat: '_str' | '_agi' | '_mag'): number {
    return this.damage + Math.round(this.wielder!.level / 2) + Math.round(this.wielder![stat] / 3);
  }
}

export abstract class Armor extends Equipment {
  constructor(wielder: Path | null = null, stats: EquipStats) {
    super(wielder, stats);
  }

  public slot = 'armor';
}

export abstract class Accessory extends Equipment {
  constructor(wielder: Path | null = null, stats: EquipStats) {
    super(wielder, stats);
  }

  public slot = 'accessory';
}

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

  damage?: number;

  statuses?: string[];
}