import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { EngineService } from '../engine.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-level-selector',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, NgClass],
  templateUrl: './level-selector.component.html',
  styleUrl: './level-selector.component.scss'
})
export class LevelSelectorComponent implements OnDestroy {
  
    private _changesub: any;

    constructor(
      private engine: EngineService,
      private changeDetector: ChangeDetectorRef
    ) {
      this._changesub = this.engine.LevelChanged.subscribe(() => {
        this.changeDetector.detectChanges();
      });
    }

    ngOnDestroy(){
      this._changesub.unsubscribe();
    }

    get levels(){
      return this.engine.Levels;
    }

    get Theme(){
      return this.engine.Theme;
    }

    GetDifficultyColor(difficulty: number){
      switch(difficulty){
        case 1:
          return "#79bdd1";
        case 2:
          return "#d4d06a";
        case 3:
          return "#d14545";
        default:
          return "black";
      }
    }

    GetDifficultyName(difficulty: number){
      switch(difficulty){
        case 1:
          return "Easy";
        case 2:
          return "Medium";
        case 3:
          return "Hard";
        default:
          return "Unknown";
      }
    }
}
