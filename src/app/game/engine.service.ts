import { Injectable } from '@angular/core';
import { LevelModel } from './classes/levels/level-model';
import { Level1 } from './classes/levels/level1';
import { Level2 } from './classes/levels/level2';
import { Level3 } from './classes/levels/level3';
import { DefenderModel } from './classes/defender';

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
    new DefenderModel(1, 1, 1, 1, "1"),
    new DefenderModel(2, 2, 2, 2, "2"),
    new DefenderModel(3, 3, 3, 3, "3"),
    new DefenderModel(1, 1, 1, 1, "1"),
    new DefenderModel(2, 2, 2, 2, "2"),
  ];

  constructor() { }

}
