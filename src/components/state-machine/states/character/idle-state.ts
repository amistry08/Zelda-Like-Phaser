import { PLAYER_ANIMATION_KEYS } from '../../../../common/assets';
import { isArcadePhysicsBody } from '../../../../common/utils';
import { Player } from '../../../../game-objects/player/player';
import { BaseCharacterState } from './base-character-state';
import { CHARACTER_STATES } from './character-states';

export class IdleState extends BaseCharacterState {
  constructor(gameObject: Player) {
    super(CHARACTER_STATES.IDLE_STATE, gameObject);
  }

  onEnter(): void {
    console.log(this._gameObject.direction);

    this._gameObject.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1 }, true);
    if (isArcadePhysicsBody(this._gameObject.body)) {
      this._gameObject.body.velocity.x = 0;
      this._gameObject.body.velocity.y = 0;
    }
  }

  onUpdate(): void {
    const controls = this._gameObject.controls;

    if (!controls.isLeftDown && !controls.isRightDown && !controls.isUpDown && !controls.isDownDown) {
      return;
    }

    this._stateMachine.setState(CHARACTER_STATES.MOVE_STATE);
  }
}
