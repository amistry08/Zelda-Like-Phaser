import * as Phaser from 'phaser';
import { SCENE_KEYS } from './scene-keys';
import { ASSET_KEYS } from '../common/assets';
import { DataManager } from '../common/data-manger';
import { KeyboardComponent } from '../components/input/keyboard-component';
import { DEFAULT_UI_TEXT_STYLE } from '../common/common';
import { LevelData } from '../common/types';

export class MainMenuScene extends Phaser.Scene {
  #menuContainer!: Phaser.GameObjects.Container;
  #cursonGameObject!: Phaser.GameObjects.Image;
  #controls!: KeyboardComponent;

  constructor() {
    super({
      key: SCENE_KEYS.MAIN_MENU_SCENE,
    });
  }

  public create(): void {
    if (!this.input.keyboard) {
      return;
    }

    this.add.text(this.scale.width / 2, 50, 'Mini Dungeon Quest', DEFAULT_UI_TEXT_STYLE).setOrigin(0.5);

    this.add
      .text(
        this.scale.width / 2,
        100,
        'Move with Arrow Keys, Press X to interact, press Z to bonk enemies ',
        DEFAULT_UI_TEXT_STYLE,
      )
      .setOrigin(0.5);

    this.#menuContainer = this.add.container(32, 142, [
      this.add.image(0, 0, ASSET_KEYS.UI_DIALOG, 0).setOrigin(0),
      this.add.text(32, 16, 'Start Game', DEFAULT_UI_TEXT_STYLE).setOrigin(0),
    ]);
    this.#cursonGameObject = this.add.image(20, 14, ASSET_KEYS.UI_CURSOR, 0).setOrigin(0);
    this.#menuContainer.add(this.#cursonGameObject);

    this.#controls = new KeyboardComponent(this.input.keyboard);
    DataManager.instance.resetPlayerHealthToMin();
  }

  public update(): void {
    if (this.#controls.isActionKeyJustDown || this.#controls.isAttackKeyJustDown || this.#controls.isEnterKeyJustDown) {
      const sceneData: LevelData = {
        level: DataManager.instance.data.currentArea.name,
        roomId: DataManager.instance.data.currentArea.startRoomId,
        doorId: DataManager.instance.data.currentArea.startDoorId,
      };
      this.scene.start(SCENE_KEYS.GAME_SCENE, sceneData);
      return;
    }

    this.#cursonGameObject.setY(14);
  }
}
