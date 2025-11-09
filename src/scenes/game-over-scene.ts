import * as Phaser from 'phaser';
import { SCENE_KEYS } from './scene-keys';
import { ASSET_KEYS } from '../common/assets';
import { DataManager } from '../common/data-manger';
import { KeyboardComponent } from '../components/input/keyboard-component';

export class GameOverScene extends Phaser.Scene {
  #menuContainer!: Phaser.GameObjects.Container;
  #cursonGameObject!: Phaser.GameObjects.Image;
  #controls!: KeyboardComponent;
  #selectedMenuOptionIndex!: number;

  constructor() {
    super({
      key: SCENE_KEYS.GAME_OVER_SCENE,
    });
  }

  public create(): void {
    if (!this.input.keyboard) {
      return;
    }

    const menuTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      align: 'Center',
      fontFamily: ASSET_KEYS.FONT_PRESS_START_2P,
      fontSize: 8,
      wordWrap: { width: 170 },
      color: '#ffffff',
    };
    this.add.text(this.scale.width / 2, 100, 'Game Over', menuTextStyle).setOrigin(0.5);
    this.#menuContainer = this.add.container(32, 142, [
      this.add.image(0, 0, ASSET_KEYS.UI_DIALOG, 0).setOrigin(0),
      this.add.text(32, 16, 'Continue', menuTextStyle).setOrigin(0),
      this.add.text(32, 32, 'Quit', menuTextStyle).setOrigin(0),
    ]);
    this.#cursonGameObject = this.add.image(20, 14, ASSET_KEYS.UI_CURSOR, 0).setOrigin(0);
    this.#menuContainer.add(this.#cursonGameObject);

    this.#controls = new KeyboardComponent(this.input.keyboard);
    this.#selectedMenuOptionIndex = 0;
    DataManager.instance.resetPlayerHealthToMin();
  }

  public update(): void {
    if (this.#controls.isActionKeyJustDown || this.#controls.isAttackKeyJustDown || this.#controls.isEnterKeyJustDown) {
      if (this.#selectedMenuOptionIndex === 1) {
        window.location.reload();
        return;
      }
      this.scene.start(SCENE_KEYS.GAME_SCENE);
      return;
    }
    if (this.#controls.isUpJustDown) {
      this.#selectedMenuOptionIndex -= 1;
      if (this.#selectedMenuOptionIndex < 0) {
        this.#selectedMenuOptionIndex = 0;
      }
    } else if (this.#controls.isDownDown) {
      this.#selectedMenuOptionIndex += 1;
      if (this.#selectedMenuOptionIndex > 1) {
        this.#selectedMenuOptionIndex = 1;
      }
    } else {
      return;
    }

    this.#cursonGameObject.setY(14 + this.#selectedMenuOptionIndex * 16);
  }
}
