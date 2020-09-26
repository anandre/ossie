/* eslint-disable @typescript-eslint/no-var-requires */
import { Status } from './status';
import { Equipment, Weapon, Armor, Accessory } from './equipment';
import { join, dirname } from 'path';
const appDir = dirname(require.main!.filename);

export abstract class Path {
  readonly path?: string;
  readonly level: number;
  readonly name?: string;
  readonly id: string;

  readonly str: number;
  readonly agi: number;
  readonly con: number;
  readonly mag: number;
  readonly spr: number;

  protected abstract speed: number;
  
  readonly _itemStats: {[key: string]: any};
  
  statuses: Status[];
  
  weapon?: Weapon;
  armor?: Armor;
  accessory?: Accessory;

  constructor(stats: PathStats) {
    this.id = stats.id;
    this.name = stats.name;
    this.level = stats.level;

    this.statuses = [];
    console.log(this.path, this);
    const _allLvlStats = require(join(appDir, `/data/pathStats/${this.path!.toLowerCase()}.json`));
    const _currLvlStats = _allLvlStats.find((x: { level: number; }) => x.level === this.level);
    this._itemStats = this._sumItemStats(this.weapon!, this.armor!, this.accessory!);

    this.str = this._itemStats.str + _currLvlStats.str;
    this.agi = this._itemStats.agi + _currLvlStats.agi;
    this.con = this._itemStats.con + _currLvlStats.con;
    this.mag = this._itemStats.mag + _currLvlStats.mag;
    this.spr = this._itemStats.spr + _currLvlStats.spr;

    const _weap = require(join(appDir, `/data/items/weapons/${stats.weaponID}`));
    this.weapon = new _weap.default({ ..._weap.stats, wielder: this });

    const _armor = require(join(appDir, `/data/items/armor/${stats.armorID}`));
    this.armor = new _armor.default({ ..._armor.stats, wielder: this });

    const _acc = require(join(appDir, `/data/items/accessories/${stats.accessoryID}`));
    this.accessory = new _acc.default({ ..._acc.stats, wielder: this });
  }

  protected _sumItemStats(...objects: Equipment[]) {
    const res: {[key: string]: any} = {
      str: 0,
      agi: 0,
      con: 0,
      mag: 0,
      spr: 0,
      hp: 0,
      mp: 0,
      acc: 0,
      focus: 0,
      tough: 0,
      mind: 0,
      resist: 0,
      dodge: 0
    };
    for (const obj of objects) {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'number') {
          if (res[key]) res[key] += value;
          else res[key] = value;
        }
      }
    }
    return res;
  }
}

export interface PathStats {
  level: number,
  id: string,
  name: string,
  weaponID: string,
  armorID: string,
  accessoryID: string
}