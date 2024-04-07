import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EngineService } from '../engine.service';
import { NgFor, NgIf } from '@angular/common';
import { DefenderModel, Defender } from '../classes/defender';

import { LevelModel } from '../classes/levels/level-model';
import { throttle } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gameMap') gameMap!: ElementRef<HTMLDivElement>;

  get mapX() : number{
    return this.gameMap.nativeElement.getBoundingClientRect().left;
  }

  get mapY() : number{
    return this.gameMap.nativeElement.getBoundingClientRect().top;
  }

  get mapWidth() : number{
    return this.gameMap.nativeElement.getBoundingClientRect().width;
  }

  get mapHeight() : number{
    return this.gameMap.nativeElement.getBoundingClientRect().height;
  }

  cursorMapX : number = 0;
  cursorMapY : number = 0;

  public selectedDefenderModel : DefenderModel | null = null;

  private _levelModel : LevelModel = this.engine.Levels[0];
  private _defenders : Defender[] = [];
  get defenders(){
    return this._defenders;
  }

  public currentRound : number = 0;
  get totalRounds(){
    return this._levelModel.totalRounds;
  }
  public mouseOverMap = false;
  public money : number = 550;

  constructor(
    private engine: EngineService,
    private zone: NgZone,
  ) { 
    
  }


  private _updateSub: any;
  ngOnInit(){
    this._levelModel = this.engine.Levels[(parseInt(window.location.pathname.split("/")[2]) - 1)];
    console.log(this._levelModel.name);

    this._updateSub = setInterval(() => {
      this.UIUpdate();
    }, 10);
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      window.document.addEventListener('mousemove', (e) => {
        this.cursorMapX = e.clientX - this.mapX;
        this.cursorMapY = e.clientY - this.mapY;
      });
    });
  }

  UIUpdate(){
    // needs to update since we are running stuff outside of angular zone
    this.cursorMapX = this.cursorMapX + 1 - 1;
    this.cursorMapY = this.cursorMapY + 1 - 1;
    //

  }

  ngOnDestroy(){
    this._updateSub.unsubscribe();
  }

  MouseEnter(){
    this.mouseOverMap = true;
  }

  MouseLeave(){
    this.mouseOverMap = false;
  }

  MouseDown(){
    if(this.selectedDefenderModel == null){
      return;
    }
    let x = Math.floor(this.cursorMapX);
    let y = Math.floor(this.cursorMapY);
    this._defenders.push(new Defender(this.selectedDefenderModel, x, y));
    this.money -= this.selectedDefenderModel.cost;
  }

  get mapTiles(){
    return this._levelModel.hitboxmap.hitboxes;
  }

  get defenderModels(){
    return this.engine.DefenderModels;
  }

  SelectDefenderModel(defender: DefenderModel){
    if(this.selectedDefenderModel == defender){
      this.selectedDefenderModel = null;
    }
    else{
      this.selectedDefenderModel = defender;
    }    
  }

  GetTileHeight() : string{
    return `calc(((50vw + 50vh) / 2) / ${this._levelModel.Height})`;
  }

  GetTileWidth() : string{
    return `calc(((50vw + 50vh) / 2) / ${this._levelModel.Width})`;
  }

  GetRangeRadius(defender: DefenderModel){
    return `calc((${defender.range * 4.5}vw + ${defender.range * 4.5}vh) / 2)`;
  }
}
