import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EngineService } from './game/engine.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy{
  title = 'celestial-defenders';

  private _changesub: any;

  constructor(
    private engineService: EngineService,
    private changeDetector: ChangeDetectorRef
  ) {
    this._changesub = this.engineService.LevelChanged.subscribe(() => {
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy(){
    this._changesub.unsubscribe();
  }

  get Theme(){
    return this.engineService.Theme;
  }
}
