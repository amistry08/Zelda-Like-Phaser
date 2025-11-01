import * as Phaser from 'phaser';
import { Direction, Position } from '../../common/types';
import { InputComponent } from '../../components/input/input-component';
import { ControlsComponent } from '../../components/game-object/controls-component';
import { StateMachine } from '../../components/state-machine/state-machine';
import { SpeedComponent } from '../../components/game-object/speed-component';
import { DirectionComponent } from '../../components/game-object/direction-component';
import { AnimationComponent, AnimationConfig } from '../../components/game-object/animation-component';

export type CharacterConfig = {
  scene: Phaser.Scene;
  position: Position;
  assetKey: string;
  frame?: number;
  inputComponent: InputComponent;
  animationConfig: AnimationConfig;
  speed: number;
  id?: string;
  isPlayer: boolean;
};

export class CharacterGameObject extends Phaser.Physics.Arcade.Sprite {
  protected _controlsComponent: ControlsComponent;
  protected _speedComponent: SpeedComponent;
  protected _directionComponent: DirectionComponent;
  protected _animationComponent: AnimationComponent;
  protected _stateMachine: StateMachine;
  protected _isPlayer: boolean;

  constructor(config: CharacterConfig) {
    const { scene, position, assetKey, frame, id, speed, animationConfig, inputComponent, isPlayer } = config;
    const { x, y } = position;
    super(scene, x, y, assetKey, frame || 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this._controlsComponent = new ControlsComponent(this, inputComponent);
    this._speedComponent = new SpeedComponent(this, speed);
    this._directionComponent = new DirectionComponent(this);
    this._animationComponent = new AnimationComponent(this, animationConfig);

    this._stateMachine = new StateMachine(id || `character`);

    this._isPlayer = isPlayer;

    config.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    config.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      config.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
    });
  }

  get isEnemy(): boolean {
    return !this._isPlayer;
  }

  get controls(): InputComponent {
    return this._controlsComponent.controls;
  }

  get speed(): number {
    return this._speedComponent.speed;
  }

  get direction(): Direction {
    return this._directionComponent.direction;
  }

  set direction(direction: Direction) {
    this._directionComponent.direction = direction;
  }

  get animationComponent(): AnimationComponent {
    return this._animationComponent;
  }

  public update(): void {
    this._stateMachine.update();
  }
}
