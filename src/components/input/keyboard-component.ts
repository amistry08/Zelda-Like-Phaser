import * as Phaser from 'phaser';
import { InputComponent } from './input-component';

export class KeyboardComponent extends InputComponent {
  #cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  #actionKey: Phaser.Input.Keyboard.Key;
  #attackKey: Phaser.Input.Keyboard.Key;
  #enterKey: Phaser.Input.Keyboard.Key;

  constructor(KeyboardPlugin: Phaser.Input.Keyboard.KeyboardPlugin) {
    super();
    this.#cursorKeys = KeyboardPlugin.createCursorKeys();
    this.#attackKey = KeyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.#actionKey = KeyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.#enterKey = KeyboardPlugin.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  get isUpDown(): boolean {
    return this.#cursorKeys.up?.isDown;
  }

  get isUpJustDown(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.#cursorKeys.up);
  }

  get isDownDown(): boolean {
    return this.#cursorKeys.down?.isDown;
  }

  get isDownJustDown(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.#cursorKeys.down);
  }

  get isLeftDown(): boolean {
    return this.#cursorKeys.left?.isDown;
  }

  get isRightDown(): boolean {
    return this.#cursorKeys.right?.isDown;
  }

  get isActionKeyJustDown(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.#actionKey);
  }

  get isAttackKeyJustDown(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.#attackKey);
  }

  get isEnterKeyJustDown(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.#enterKey);
  }

  get isSelectKeyJustDown(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.#cursorKeys.shift);
  }
}
