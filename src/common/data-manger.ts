import { LEVEL_NAME } from './common';
import { PLAYER_START_MAX_HEALTH } from './config';
import { LevelName } from './types';

export type PlayerData = {
  currentHealth: number;
  maxHealth: number;
  currentArea: {
    name: LevelName;
    startRoomId: number;
    startDoorId: number;
  };
  areaDetails: {
    [key in LevelName]: {
      [key: number]: {
        chest: {
          [key: string]: {
            revealed: boolean;
            opened: boolean;
          };
        };
        doors: {
          [key: string]: {
            unlocked: boolean;
          };
        };
      };
      bossDefeated?: boolean;
    };
  };
};

export class DataManager {
  static #instance: DataManager;

  #data: PlayerData;

  private constructor() {
    this.#data = {
      currentHealth: PLAYER_START_MAX_HEALTH,
      maxHealth: PLAYER_START_MAX_HEALTH,
      currentArea: {
        name: LEVEL_NAME.DUNGEON_1,
        startRoomId: 3,
        startDoorId: 3,
      },
      areaDetails: {
        DUNGEON_1: {
          bossDefeated: false,
        },
        WORLD: {},
      },
    };
  }

  public static get instance(): DataManager {
    if (!DataManager.#instance) {
      DataManager.#instance = new DataManager();
    }
    return DataManager.#instance;
  }

  get data(): PlayerData {
    return { ...this.#data };
  }

  set data(data: PlayerData) {
    this.#data = { ...this.data };
  }

  public updateAreaData(area: LevelName, startRoomId: number, startDoorId: number): void {
    this.#data.currentArea = {
      name: area,
      startRoomId: startRoomId,
      startDoorId: startDoorId,
    };
  }

  public updateChestData(roomId: number, chestId: number, revealed: boolean, opened: boolean): void {
    this.#populateDefaultRoomData(roomId);
    this.#data.areaDetails[this.#data.currentArea.name][roomId].chest[chestId] = {
      revealed,
      opened,
    };
  }

  public updateDoorData(roomId: number, doorId: number, unlocked: boolean): void {
    this.#populateDefaultRoomData(roomId);
    this.#data.areaDetails[this.#data.currentArea.name][roomId].doors[doorId] = {
      unlocked,
    };
  }

  public resetPlayerHealthToMin(): void {
    this.#data.currentHealth = PLAYER_START_MAX_HEALTH;
  }

  public updatePlayerCurrentHealth(health: number): void {
    this.#data.currentHealth = health;
  }

  #populateDefaultRoomData(roomId: number): void {
    if (this.#data.areaDetails[this.#data.currentArea.name][roomId] === undefined) {
      this.#data.areaDetails[this.#data.currentArea.name][roomId] = {
        chest: {},
        doors: {},
      };
    }
  }
}
