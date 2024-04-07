import { Injectable } from '@angular/core';
import { Level } from './classes/levels/level';
import { Level1 } from './classes/levels/level1';
import { Level2 } from './classes/levels/level2';
import { Level3 } from './classes/levels/level3';
import { Defender } from './classes/defender';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  public Levels : Level[] = [
    new Level1(),
    new Level2(),
    new Level3()
  ];

  public Defenders: Defender[] = [
    new Defender(1, 1, 1, 1, "1"),
    new Defender(2, 2, 2, 2, "2"),
    new Defender(3, 3, 3, 3, "3"),
    new Defender(1, 1, 1, 1, "1"),
    new Defender(2, 2, 2, 2, "2"),
    new Defender(3, 3, 3, 3, "3"),
    new Defender(1, 1, 1, 1, "1"),
    new Defender(2, 2, 2, 2, "2"),
    new Defender(3, 3, 3, 3, "3")
  ];

  public loadedLevel : Level | null = null;

  constructor() { }

  public async SetLevel(level: string){
    let levelNum = parseInt(level);
    if(levelNum > 0 && levelNum <= this.Levels.length){
      this.loadedLevel = this.Levels[levelNum - 1];
    }
  }
}
