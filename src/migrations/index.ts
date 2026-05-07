import * as migration_20260507_175724_initial from './20260507_175724_initial';

export const migrations = [
  {
    up: migration_20260507_175724_initial.up,
    down: migration_20260507_175724_initial.down,
    name: '20260507_175724_initial'
  },
];
