import { CHARACTER_STATES } from '../../character-states';
import { CharacterGameObject } from '../../../../../../game-objects/common/character-game-object';
import { BaseCharacterState } from '../../base-character-state';
import { ENEMY_BOSS_HIDDEN_STATE_DURATION } from '../../../../../../common/config';

export class BossDrowHiddenState extends BaseCharacterState {
  constructor(gameObject: CharacterGameObject) {
    super(CHARACTER_STATES.HIDDEN_STATE, gameObject);
  }

  onEnter(): void {
    this._gameObject.disableObject();
    this._gameObject.scene.time.delayedCall(ENEMY_BOSS_HIDDEN_STATE_DURATION, () => {
      this._gameObject.enableObject();
      this._stateMachine.setState(CHARACTER_STATES.TELEPORT_STATE);
    });
  }
}
