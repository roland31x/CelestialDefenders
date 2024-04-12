import { Injectable } from '@angular/core';
import { LevelModel } from './classes/levels/level-model';
import { Level1 } from './classes/levels/level1';
import { Level2 } from './classes/levels/level2';
import { Level3 } from './classes/levels/level3';
import { DefenderModel } from './classes/defenders/defender';
import { ApprenticeModel } from './classes/defenders/models/apprentice';
import { SpellcasterModel } from './classes/defenders/models/spellcaster';
import { FreezerModel } from './classes/defenders/models/freezer';
import { ArchmageModel } from './classes/defenders/models/archmage';
import { WarlockModel } from './classes/defenders/models/warlock';
import { HolySpiritModel } from './classes/defenders/models/holy-spirit';
import { CurserModel } from './classes/defenders/models/curser';
import { BinderModel } from './classes/defenders/models/binder';


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
    new ApprenticeModel(),
    new SpellcasterModel(),
    new BinderModel(),
    new FreezerModel(),
    new WarlockModel(),
    new CurserModel(),
    new ArchmageModel(),
    new HolySpiritModel(),
  ];

  private StatMapValues: Map<string, { min: number, max: number }> = new Map([
    ["Damage", { min: 0, max: 50 }],
    ["Range", { min: 4, max: 25 }],
    ["AttackSpeed", { min: 0.05, max: 2 }]
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
