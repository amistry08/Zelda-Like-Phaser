import * as Phaser from 'phaser';
import { Position } from '../../common/types';
import { ASSET_KEYS } from '../../common/assets';
import { InteractiveObjectComponent } from '../../components/game-object/interractive-object-component';
import { INTERACTIVE_OBJECT_TYPE } from '../../common/common';

type PotConfig = {
  scene: Phaser.Scene;
  positon: Position;
};

export class Pot extends Phaser.Physics.Arcade.Sprite {
  #position: Position;

  constructor(config: PotConfig) {
    const { scene, positon } = config;
    super(scene, positon.x, positon.y, ASSET_KEYS.POT, 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setOrigin(0, 1).setImmovable(true);

    this.#position = { x: positon.x, y: positon.y };

    new InteractiveObjectComponent(this, INTERACTIVE_OBJECT_TYPE.PICKUP);
  }
}
