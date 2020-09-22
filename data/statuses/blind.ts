import { Status } from '../common/status';

export default class Blind extends Status {
  constructor() {
    super({
      name: 'blind',
      duration: 3,
      description: 'Reduces chance to hit with physical attacks.',
      type: 'to-hit',
      mod: 20
    });
  }
}