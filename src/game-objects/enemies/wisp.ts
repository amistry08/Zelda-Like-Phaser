import * as Phaser from 'phaser';
import { Position } from '../../common/types';
import { InputComponent } from '../../components/input/input-component';
import { CHARACTER_STATES } from '../../components/state-machine/states/character/character-states';
import {
  ENEMY_WISP_PULSE_ANIMATION_DURATION,
  ENEMY_WISP_PULSE_ANIMATION_SCALE_X,
  ENEMY_WISP_PULSE_ANIMATION_SCALE_Y,
  ENEMY_WISP_SPEED,
  ENEMY_WISP_START_MAX_HEALTH,
} from '../../common/config';
import { AnimationConfig } from '../../components/game-object/animation-component';
import { ASSET_KEYS, WISP_ANIMATION_KEYS } from '../../common/assets';
import { CharacterGameObject } from '../common/character-game-object';
import { BounceMoveState } from '../../components/state-machine/states/character/bounce-move-state';

export type WispConfig = {
  scene: Phaser.Scene;
  position: Position;
};

export class Wisp extends CharacterGameObject {
  constructor(config: WispConfig) {
    const animConfig = { key: WISP_ANIMATION_KEYS.IDLE, repeat: -1, ignoreIfPlaying: true };
    const animationConfig: AnimationConfig = {
      IDLE_DOWN: animConfig,
      IDLE_UP: animConfig,
      IDLE_LEFT: animConfig,
      IDLE_RIGHT: animConfig,
    };

    super({
      id: `wisp-${Phaser.Math.RND.uuid()}`,
      frame: 0,
      assetKey: ASSET_KEYS.WISP,
      speed: ENEMY_WISP_SPEED,
      scene: config.scene,
      position: config.position,
      inputComponent: new InputComponent(),
      animationConfig: animationConfig,
      isPlayer: false,
      isInvulnerable: true,
      maxLife: ENEMY_WISP_START_MAX_HEALTH,
    });

    this._stateMachine.addState(new BounceMoveState(this));
    this._stateMachine.setState(CHARACTER_STATES.BOUNCE_MOVE_STATE);

    this.scene.tweens.add({
      targets: this,
      scaleX: ENEMY_WISP_PULSE_ANIMATION_SCALE_X,
      scaleY: ENEMY_WISP_PULSE_ANIMATION_SCALE_Y,
      yoyo: true,
      repeat: -1,
      duration: ENEMY_WISP_PULSE_ANIMATION_DURATION,
    });
  }
}
