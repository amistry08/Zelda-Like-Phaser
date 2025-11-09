import * as Phaser from 'phaser';
import { Direction, Position } from '../../common/types';
import { InputComponent } from '../../components/input/input-component';
import { IdleState } from '../../components/state-machine/states/character/idle-state';
import { CHARACTER_STATES } from '../../components/state-machine/states/character/character-states';
import { MoveState } from '../../components/state-machine/states/character/move-state';
import {
  ENEMY_SPIDER_HURT_PUSH_BACK_SPEED,
  ENEMY_SPIDER_CHANGE_DIRECTION_DELAY_MAX,
  ENEMY_SPIDER_CHANGE_DIRECTION_DELAY_MIN,
  ENEMY_SPIDER_CHANGE_DIRECTION_DELAY_WAIT,
  ENEMY_SPIDER_SPEED,
  ENEMY_SPIDER_START_MAX_HEALTH,
} from '../../common/config';
import { AnimationConfig } from '../../components/game-object/animation-component';
import { ASSET_KEYS, SPIDER_ANIMATION_KEYS } from '../../common/assets';
import { CharacterGameObject } from '../common/character-game-object';
import { DIRECTION } from '../../common/common';
import { exhaustiveGuard } from '../../common/utils';
import { HurtState } from '../../components/state-machine/states/character/hurt-state';
import { DeathState } from '../../components/state-machine/states/character/death-state';

export type SpiderConfig = {
  scene: Phaser.Scene;
  position: Position;
};

export class Spider extends CharacterGameObject {
  constructor(config: SpiderConfig) {
    const animConfig = { key: SPIDER_ANIMATION_KEYS.WALK, repeat: -1, ignoreIfPlaying: true };
    const hurtAnimConfig = { key: SPIDER_ANIMATION_KEYS.HIT, repeat: 0, ignoreIfPlaying: true };
    const dieAnimConfig = { key: SPIDER_ANIMATION_KEYS.DEATH, repeat: 0, ignoreIfPlaying: true };

    const animationConfig: AnimationConfig = {
      WALK_DOWN: animConfig,
      WALK_UP: animConfig,
      WALK_LEFT: animConfig,
      WALK_RIGHT: animConfig,
      IDLE_DOWN: animConfig,
      IDLE_UP: animConfig,
      IDLE_LEFT: animConfig,
      IDLE_RIGHT: animConfig,
      HURT_DOWN: hurtAnimConfig,
      HURT_UP: hurtAnimConfig,
      HURT_LEFT: hurtAnimConfig,
      HURT_RIGHT: hurtAnimConfig,
      DIE_DOWN: dieAnimConfig,
      DIE_UP: dieAnimConfig,
      DIE_LEFT: dieAnimConfig,
      DIE_RIGHT: dieAnimConfig,
    };

    super({
      id: `spider-${Phaser.Math.RND.uuid()}`,
      frame: 0,
      assetKey: ASSET_KEYS.SPIDER,
      speed: ENEMY_SPIDER_SPEED,
      scene: config.scene,
      position: config.position,
      inputComponent: new InputComponent(),
      animationConfig: animationConfig,
      isPlayer: false,
      isInvulnerable: false,
      maxLife: ENEMY_SPIDER_START_MAX_HEALTH,
    });

    this._directionComponent.callback = (direction: Direction) => {
      this.#handleDirectionChange(direction);
    };

    this._stateMachine.addState(new IdleState(this));
    this._stateMachine.addState(new MoveState(this));
    this._stateMachine.addState(new HurtState(this, ENEMY_SPIDER_HURT_PUSH_BACK_SPEED));
    this._stateMachine.addState(new DeathState(this));
    this._stateMachine.setState(CHARACTER_STATES.IDLE_STATE);
  }

  public enableObject(): void {
    super.enableObject();

    this.scene.time.addEvent({
      delay: Phaser.Math.Between(ENEMY_SPIDER_CHANGE_DIRECTION_DELAY_MIN, ENEMY_SPIDER_CHANGE_DIRECTION_DELAY_MAX),
      callback: this.#changeDriection,
      callbackScope: this,
      loop: false,
    });
  }

  #handleDirectionChange(direction: Direction): void {
    switch (direction) {
      case DIRECTION.DOWN:
        this.setAngle(0);
        break;
      case DIRECTION.UP:
        this.setAngle(180);
        break;
      case DIRECTION.LEFT:
        this.setAngle(90);
        break;
      case DIRECTION.RIGHT:
        this.setAngle(270);
        break;
      default:
        exhaustiveGuard(direction);
    }
  }

  #changeDriection(): void {
    this.controls.reset();

    if (!this.active) {
      return;
    }

    this.scene.time.delayedCall(ENEMY_SPIDER_CHANGE_DIRECTION_DELAY_WAIT, () => {
      const randomDirection = Phaser.Math.Between(0, 3);
      if (randomDirection === 0) {
        this.controls.isUpDown = true;
      } else if (randomDirection === 1) {
        this.controls.isDownDown = true;
      } else if (randomDirection === 2) {
        this.controls.isLeftDown = true;
      } else {
        this.controls.isRightDown = true;
      }

      this.scene.time.addEvent({
        delay: Phaser.Math.Between(ENEMY_SPIDER_CHANGE_DIRECTION_DELAY_MIN, ENEMY_SPIDER_CHANGE_DIRECTION_DELAY_MAX),
        callback: this.#changeDriection,
        callbackScope: this,
        loop: false,
      });
    });
  }
}
