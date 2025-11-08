export class InputComponent {
  #up: boolean;
  #down: boolean;
  #left: boolean;
  #right: boolean;
  #actionKey: boolean;
  #attackKey: boolean;
  #selectKey: boolean;
  #enterKey: boolean;
  #isMovementLocked: boolean;

  constructor() {
    this.#up = false;
    this.#down = false;
    this.#left = false;
    this.#right = false;
    this.#actionKey = false;
    this.#attackKey = false;
    this.#selectKey = false;
    this.#enterKey = false;
    this.#isMovementLocked = false;
  }

  get isMovementLocked(): boolean {
    return this.#isMovementLocked;
  }

  set isMovementLocked(value: boolean) {
    this.#isMovementLocked = value;
  }

  get isUpDown(): boolean {
    return this.#up;
  }

  set isUpDown(value: boolean) {
    this.#up = value;
  }

  get isUpJustDown(): boolean {
    return this.#up;
  }

  get isDownDown(): boolean {
    return this.#down;
  }

  set isDownDown(value: boolean) {
    this.#down = value;
  }

  get isDownJustDown(): boolean {
    return this.#down;
  }

  get isLeftDown(): boolean {
    return this.#left;
  }

  set isLeftDown(value: boolean) {
    this.#left = value;
  }

  get isRightDown(): boolean {
    return this.#right;
  }

  set isRightDown(value: boolean) {
    this.#right = value;
  }

  get isActionKeyJustDown(): boolean {
    return this.#actionKey;
  }

  set isActionKeyJustDown(value: boolean) {
    this.#actionKey = value;
  }

  get isAttackKeyJustDown(): boolean {
    return this.#attackKey;
  }

  set isAttackKeyJustDown(value: boolean) {
    this.#attackKey = value;
  }

  get isSelectKeyJustDown(): boolean {
    return this.#selectKey;
  }

  set isSelectKeyJustDown(value: boolean) {
    this.#selectKey = value;
  }

  get isEnterKeyJustDown(): boolean {
    return this.#enterKey;
  }

  set isEnterKeyJustDown(value: boolean) {
    this.#enterKey = value;
  }

  public reset(): void {
    this.#up = false;
    this.#down = false;
    this.#left = false;
    this.#right = false;
    this.#actionKey = false;
    this.#attackKey = false;
    this.#selectKey = false;
    this.#enterKey = false;
  }
}
