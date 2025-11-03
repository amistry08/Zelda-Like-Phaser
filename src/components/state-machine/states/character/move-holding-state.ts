import { CharacterGameObject } from '../../../../game-objects/common/character-game-object';
import { BaseMoveState } from './base-move-state';
import { CHARACTER_STATES } from './character-states';

export class MoveHoldingState extends BaseMoveState {
  constructor(gameObject: CharacterGameObject) {
    super(CHARACTER_STATES.MOVE_HOLDING_STATE, gameObject, 'WALK_HOLD');
  }

  onUpdate(): void {
    const controls = this._gameObject.controls;

    if (controls.isActionKeyJustDown) {
      this._stateMachine.setState(CHARACTER_STATES.IDLE_STATE);
      return;
    }

    if (this.isNoInputComponent(controls)) {
      this._stateMachine.setState(CHARACTER_STATES.IDLE_HOLDING_STATE);
    }

    this.handleCharactedMovement();
  }
}
