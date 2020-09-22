import { Collection } from 'discord.js';
import { Path } from './path';
import { Weapon, Armor, Accessory } from './equipment';
import { Status } from './status';
import { readdir } from 'fs';
import { join, dirname } from 'path';
const appDir = dirname(require.main!.filename);

export const DataManager = {
  paths: new Collection<string, Path>(),
  weapons: new Collection<string, Weapon>(),
  armors: new Collection<string, Armor>(),
  accessory: new Collection<string, Accessory>(),
  statuses: new Collection<string, Status>()
};

readdir(join(appDir, '/data/paths/'), async (err, files) => {
  if (err) console.error(err);
  for (const file of files) {
    const _imported = await import(join(appDir, `/data/paths/${file}`));
    const imported = 'default' in _imported ? _imported.default : _imported;
    const path: Path = new imported();
    DataManager.paths.set(path.path, path);
  }
});

readdir(join(appDir, '/data/items/weapons/'), async (err, files) => {
  if (err) console.error(err);
  for (const file of files) {
    const _imported = await import(join(appDir, `/data/items/weapons/${file}`));
    const imported = 'default' in _imported ? _imported.default : _imported;
    const weapon: Weapon = new imported();
    DataManager.weapons.set(weapon.id, weapon);
  }
});

readdir(join(appDir, '/data/items/armor'), async (err, files) => {
  if (err) console.error(err);
  for (const file of files) {
    const _imported = await import(join(appDir, `/data/items/armor/${file}`));
    const imported = 'default' in _imported ? _imported.default : _imported;
    const armor: Armor = new imported();
    DataManager.armors.set(armor.id, armor);
  }
});

readdir(join(appDir, '/data/items/accessories'), async (err, files) => {
  if (err) console.error(err);
  for (const file of files) {
    const _imported = await import(join(appDir, `/data/items/accessories/${file}`));
    const imported = 'default' in _imported ? _imported.default : _imported;
    const accessory: Accessory = new imported();
    DataManager.armors.set(accessory.id, accessory);
  }
});

readdir(join(appDir, '/data/statuses'), async (err, files) => {
  if (err) console.error(err);
  for (const file of files) {
    const _imported = await import(join(appDir, `/data/statuses/${file}`));
    const imported = 'default' in _imported ? _imported.default : _imported;
    const status: Status = new imported();
    DataManager.statuses.set(status.name, status);
  }
});