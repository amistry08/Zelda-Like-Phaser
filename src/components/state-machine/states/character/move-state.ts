import { PLAYER_ANIMATION_KEYS } from '../../../../common/assets';
import { DIRECTION } from '../../../../common/common';
import { Direction } from '../../../../common/types';
import { isArcadePhysicsBody } from '../../../../common/utils';
import { Player } from '../../../../game-objects/player/player';
import { BaseCharacterState } from './base-character-state';
import { CHARACTER_STATES } from './character-states';

export class MoveState extends BaseCharacterState {
  constructor(gameObject: Player) {
    super(CHARACTER_STATES.MOVE_STATE, gameObject);
  }

  onUpdate(): void {
    const controls = this._gameObject.controls;

    if (!controls.isLeftDown && !controls.isRightDown && !controls.isUpDown && !controls.isDownDown) {
      this._stateMachine.setState(CHARACTER_STATES.IDLE_STATE);
    }

    if (controls.isUpDown) {
      this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.WALK_UP, repeat: -1 }, true);
      this.#updateVelocity(false, -1);
      this.#updateDirection(DIRECTION.UP);
    } else if (controls.isDownDown) {
      this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.WALK_DOWN, repeat: -1 }, true);
      this.#updateVelocity(false, 1);
      this.#updateDirection(DIRECTION.DOWN);
    } else {
      this.#updateVelocity(false, 0);
    }

    const isMovingVertically = controls.isUpDown || controls.isDownDown;

    if (controls.isLeftDown) {
      this._gameObject.setFlipX(true);
      this.#updateVelocity(true, -1);
      this.#updateDirection(DIRECTION.LEFT);
      if (!isMovingVertically) {
        this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1 }, true);
      }
    } else if (controls.isRightDown) {
      this._gameObject.setFlipX(false);
      this.#updateVelocity(true, 1);
      this.#updateDirection(DIRECTION.RIGHT);
      if (!isMovingVertically) {
        this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1 }, true);
      }
    } else {
      this.#updateVelocity(true, 0);
    }

    this.#normalizeVelocity();
  }

  #updateVelocity(isX: boolean, value: number): void {
    if (!isArcadePhysicsBody(this._gameObject.body)) {
      return;
    }
    if (isX) {
      this._gameObject.body.velocity.x = value;
      return;
    }
    this._gameObject.body.velocity.y = value;
  }

  #normalizeVelocity(): void {
    if (!isArcadePhysicsBody(this._gameObject.body)) {
      return;
    }
    this._gameObject.body.velocity.normalize().scale(this._gameObject.speed);
  }

  #updateDirection(direction: Direction): void {
    this._gameObject.direction = direction;
  }
}
