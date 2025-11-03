import * as Phaser from 'phaser';
import { ChestState, Position } from '../../common/types';
import { ASSET_KEYS, CHEST_FRAME_KEYS } from '../../common/assets';
import { CHEST_STATE, INTERACTIVE_OBJECT_TYPE } from '../../common/common';
import { InteractiveObjectComponent } from '../../components/game-object/interractive-object-component';

type ChestConfig = {
  scene: Phaser.Scene;
  positon: Position;
  requireBossKey: boolean;
  chestState?: ChestState;
};

export class Chest extends Phaser.Physics.Arcade.Image {
  #state: ChestState;
  #isBossKeyChest: boolean;

  constructor(config: ChestConfig) {
    const { scene, positon } = config;
    const frameKey = config.requireBossKey ? CHEST_FRAME_KEYS.BIG_CHEST_CLOSED : CHEST_FRAME_KEYS.SMALL_CHEST_CLOSED;
    super(scene, positon.x, positon.y, ASSET_KEYS.DUNGEON_OBJECTS, frameKey);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setOrigin(0, 1).setImmovable(true);

    this.#state = config.chestState || CHEST_STATE.HIDDEN;
    this.#isBossKeyChest = config.requireBossKey;

    if (this.#isBossKeyChest) {
      (this.body as Phaser.Physics.Arcade.Body).setSize(32, 32).setOffset(0, 8);
    }

    new InteractiveObjectComponent(this, INTERACTIVE_OBJECT_TYPE.OPEN);
  }

  public open(): void {
    if (this.#state !== CHEST_STATE.REVEALED) {
      return;
    }
    this.#state = CHEST_STATE.OPEN;
    const frameKey = this.#isBossKeyChest ? CHEST_FRAME_KEYS.BIG_CHEST_OPEN : CHEST_FRAME_KEYS.SMALL_CHEST_OPEN;
    this.setFrame(frameKey);
  }
}
