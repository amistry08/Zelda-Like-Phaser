import * as Phaser from 'phaser';
import { ASSET_KEYS } from './assets';

export const DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;

export const CHEST_STATE = {
  HIDDEN: 'HIDDEN',
  REVEALED: 'REVEALED',
  OPEN: 'OPEN',
} as const;

export const INTERACTIVE_OBJECT_TYPE = {
  AUTO: 'AUTO',
  PICKUP: 'PICKUP',
  OPEN: 'OPEN',
} as const;

export const LEVEL_NAME = {
  WORLD: 'WORLD',
  DUNGEON_1: 'DUNGEON_1',
} as const;

export const DUNGEON_ITEM = {
  SMALL_KEY: 'SMALL_KEY',
  BOSS_KEY: 'BOSS_KEY',
  MAP: 'MAP',
  COMPASS: 'COMPASS',
} as const;

export const DEFAULT_UI_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
  align: 'Center',
  fontFamily: ASSET_KEYS.FONT_PRESS_START_2P,
  fontSize: 8,
  wordWrap: { width: 170 },
  color: '#ffffff',
};

export const CHEST_REWARD_TO_DIALOG_MAP = {
  SMALL_KEY: 'You found a small key! You can use this to open locked doors. Press Enter to continue',
  BOSS_KEY: 'This is the master key of the Dungeon. It can open many locks that small key cannot',
  COMPASS:
    'An Inscription! Let none of the foes remain. Only then will the hidden casket in last chamber reveal itself.',
  MAP: 'You found the Note! There is a hidden chest in the room!',
  NOTHING: '... The chest was empty',
} as const;
