import * as Phaser from 'phaser';
import { SCENE_KEYS } from './scene-keys';
import { ASSET_KEYS } from '../common/assets';
import { KeyboardComponent } from '../components/input/keyboard-component';
import { Player } from '../game-objects/player/player';
import { Spider } from '../game-objects/enemies/spider';

export class GameScene extends Phaser.Scene {
  #controls!: KeyboardComponent;
  #player!: Player;
  #spider!: Spider;

  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  public create(): void {
    if (!this.input.keyboard) {
      console.warn('Keyboard input not available');
      return;
    }
    this.#controls = new KeyboardComponent(this.input.keyboard);
    this.add
      .text(this.scale.width / 2, this.scale.height / 2, 'Game Scene 2', { fontFamily: ASSET_KEYS.FONT_PRESS_START_2P })
      .setOrigin(0.5);

    this.#player = new Player({
      scene: this,
      position: { x: this.scale.width / 2, y: this.scale.height / 2 },
      controls: this.#controls,
    });

    this.#spider = new Spider({
      scene: this,
      position: { x: this.scale.width / 2, y: this.scale.height / 2 + 50 },
    });
    this.#spider.setCollideWorldBounds(true);
  }

  public update(): void {
    this.#spider.update();
  }
}
