import { Routes } from '@angular/router';
import { MainMenuComponent } from './game/main-menu/main-menu.component';
import { LevelSelectorComponent } from './game/level-selector/level-selector.component';
import { GameComponent } from './game/game/game.component';

export const routes: Routes = [
    { path: '', component: MainMenuComponent, pathMatch: 'full' },
    { path: 'levels', component: LevelSelectorComponent },
    { path: 'game/:level' , component: GameComponent }
];
