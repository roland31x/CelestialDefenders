import { ChangeDetectorRef, Injectable } from '@angular/core';
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
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EngineService {

  public Levels : LevelModel[] = [
    new Level1(),
    new Level2(),
    new Level3()
  ];

  public selectedLevel: LevelModel = this.Levels[0];

  public DefenderModels: DefenderModel[] = [
    new ApprenticeModel(),
    new BinderModel(),
    new FreezerModel(),
    new SpellcasterModel(),
    new WarlockModel(),
    new CurserModel(),
    new ArchmageModel(),
    new HolySpiritModel(),
  ];

  private StatMapValues: Map<string, { min: number, max: number }> = new Map([
    ["Damage", { min: 0, max: 50 }],
    ["Range", { min: 5, max: 30 }],
    ["AttackSpeed", { min: 0, max: 1.5 }]
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

  public get Theme(){
    switch(this.selectedLevel){
      case this.Levels[0]:
        return "green";
      case this.Levels[1]:
        return "desert";
      case this.Levels[2]:
        return "frost";
      default:
        return "theme1";
    }
  }

  public LevelChanged: Subject<void> = new Subject<void>();

  public SetLevel(level: number){
    this.selectedLevel = this.Levels[level - 1];
    this.LevelChanged.next();
  }

  constructor() { 

  }
}
