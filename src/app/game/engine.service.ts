import { Injectable } from '@angular/core';
import { LevelModel } from './classes/levels/level-model';
import { Level1 } from './classes/levels/level1';
import { Level2 } from './classes/levels/level2';
import { Level3 } from './classes/levels/level3';
import { DefenderModel } from './classes/defenders/defender';
import { ArcherModel } from './classes/defenders/models/archer';
import { MageModel } from './classes/defenders/models/mage';


@Injectable({
  providedIn: 'root'
})
export class EngineService {

  public Levels : LevelModel[] = [
    new Level1(),
    new Level2(),
    new Level3()
  ];

  public DefenderModels: DefenderModel[] = [
    new ArcherModel(),
    new MageModel(),
  ];

  private StatMapValues: Map<string, { min: number, max: number }> = new Map([
    ["Damage", { min: 1, max: 25 }],
    ["Range", { min: 4, max: 25 }],
    ["AttackSpeed", { min: 0.25, max: 2 }]
  ]);

  private GetPercent(value: number, min: number, max: number): number {
    return Math.floor((value - min) / (max - min) * 100);
  }

  public GetDamagePercent(value: number): number {
    return this.GetPercent(value, this.StatMapValues.get("Damage")!.min, this.StatMapValues.get("Damage")!.max);
  }

  public GetRangePercent(value: number): number {
    return this.GetPercent(value, this.StatMapValues.get("Range")!.min, this.StatMapValues.get("Range")!.max);
  }

  public GetAttackSpeedPercent(value: number): number {
    return this.GetPercent(value, this.StatMapValues.get("AttackSpeed")!.min, this.StatMapValues.get("AttackSpeed")!.max);
  }

  constructor() { }

}
