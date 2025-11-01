import * as Phaser from 'phaser';
import { CharacterAnimation, GameObject } from '../../common/types';
import { BaseGameObjectComponent } from './base-game-object-component';

export type AnimationConfig = {
  [key in CharacterAnimation]?: { key: string; repeat: number; ignoreIfPlaying?: boolean };
};
export class AnimationComponent extends BaseGameObjectComponent {
  declare protected gameObject: Phaser.GameObjects.Sprite;
  #config: AnimationConfig;

  constructor(gameObject: GameObject, config: AnimationConfig) {
    super(gameObject);
    this.#config = config;
  }

  public getAnimationKey(characterAnimation: CharacterAnimation): string | undefined {
    if (this.#config[characterAnimation] === undefined) {
      return undefined;
    }
    return this.#config[characterAnimation].key;
  }

  public playAnimation(characterAnimation: CharacterAnimation, callback?: () => void): void {
    if (this.#config[characterAnimation] === undefined) {
      if (callback) {
        callback();
      }
      return;
    }
    const animationConfig: Phaser.Types.Animations.PlayAnimationConfig = {
      key: this.#config[characterAnimation].key,
      repeat: this.#config[characterAnimation].repeat,
      timeScale: 1,
    };
    const animationKey = Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + this.#config[characterAnimation].key;
    if (callback) {
      this.gameObject.once(animationKey, () => {
        callback();
      });
    }
    this.gameObject.play(animationConfig, this.#config[characterAnimation].ignoreIfPlaying);
  }

  public isAnimationPlaying(): boolean {
    return this.gameObject.anims.isPlaying;
  }
}
