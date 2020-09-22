import { Status } from './status';
import { Weapon, Armor, Accessory } from './equipment';
import { join, dirname } from 'path';
const appDir = dirname(require.main!.filename);

export abstract class Path {
  abstract path: string;
  level: number;
  name?: string;
  id: string;
  _str: number;
  _agi: number;
  _con: number;
  _mag: number;
  _spr: number;

  speed?: number;
  
  statuses: Status[];
  
  weaponID: string;
  weapon?: Weapon;
  armor?: Armor;
  accessory?: Accessory;

  constructor(stats: PathStats) {
    this.id = stats.id;
    this.name = stats.name;
    this.level = stats.level;

    this._str = stats._str;
    this._agi = stats._agi;
    this._con = stats._con;
    this._mag = stats._mag;
    this._spr = stats._spr;

    this.statuses = [];

    this.weaponID = stats.weaponID;

    // console.log(require(join(appDir, `/data/items/weapons/${stats.weaponID}`)).default);
    // this.weapon = new (require(join(appDir, `/data/items/weapons/${stats.weaponID}`)))(this);
    // this.armor = new (require(join(appDir, `/data/items/armor/${stats.armorID}`)))(this);
    // this.accessory = new (require(join(appDir, `/data/items/accessories/${stats.accessoryID}`)))(this);
  }

  public async setWeapon(): Promise<void> {
    const _imported = await import(`../items/weapons/${this.weaponID}`);
    const _weapon = 'default' in _imported ? _imported.default : _imported;
    this.weapon = new _weapon(this);
  }

  public sumSats(): number {
    return 3;
  }
}

export interface PathStats {
  level: number,
  id: string,
  name: string,
  _str: number,
  _agi: number,
  _con: number,
  _mag: number,
  _spr: number,
  weaponID: string,
  armorID: string,
  accessoryID: string
}