import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EngineService } from '../engine.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { DefenderModel, Defender } from '../classes/defenders/defender';
import { LevelModel } from '../classes/levels/level-model';
import { DefenderUpgrade } from '../classes/defenders/defender-upgrades';
import { Attacker } from '../classes/attackers/attacker';
import { Projectile } from '../classes/projectiles/projectile';
import { ActivatedRoute } from '@angular/router';
import { DamageArea } from '../classes/projectiles/effects/effect-enums';
import { FinalEffect } from '../classes/projectiles/effects/final-effect';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './game.component.html',
  styleUrls: [
    './game.component.scss',
    './css/game.defenders.scss',
    './css/game.stats.scss',
    './css/game.attackers.scss',
    './css/game.projectiles.scss',
  ]
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gameMap') gameMap!: ElementRef<HTMLDivElement>;
  private readonly gameVW = 60;
  private readonly gameVH = 60;

  public readonly AOES: { position: {x : number, y: number}, radius: number, class: string}[] = [];

  get Background() : string{
    return this._levelModel.background;
  }

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

  private _selectedDefenderModel : DefenderModel | null = null;
  get selectedDefenderModel(){
    return this._selectedDefenderModel;
  }
  set selectedDefenderModel(value : DefenderModel | null){
    if(value && this._selectedDefender){
      this._selectedDefender = null;
    }
    this._selectedDefenderModel = value;
  }

  private _selectedDefender : Defender | null = null;
  get selectedDefender(){
    return this._selectedDefender;
  }
  set selectedDefender(value : Defender | null){
    if(value && this._selectedDefenderModel){
      this._selectedDefenderModel = null;
    }
    this._selectedDefender = value;
  }
  private _level: number = 1;
  private _levelModel : LevelModel = this.engine.Levels[this._level - 1];
  private _defenders : Defender[] = [];
  get defenders(){
    return this._defenders;
  }

  private _attackers : Attacker[] = [];
  private _attackerSubs: any[] = [];
  get attackers(){
    return this._attackers;
  }

  private _projectiles : Projectile[] = [];
  get projectiles(){
    return this._projectiles;
  }

  private defendersMap : Map<Defender, Attacker[]> = new Map();

  public currentRound : number = 0;
  get totalRounds(){
    return this._levelModel.totalRounds;
  }
  public mouseOverMap = false;
  public money : number = 550;

  constructor(
    private engine: EngineService,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute
  ) { 
    
  }

  getDamagePercent(value: number){
    return this.engine.GetDamagePercent(value);
  }

  getRangePercent(value: number){
    return this.engine.GetRangePercent(value);
  }

  getAttackSpeedPercent(value: number){
    return this.engine.GetAttackSpeedPercent(value);
  }

  private _updateSub: any;
  private _routeSub: any;
  ngOnInit(){

    this._routeSub = this.activatedRoute.params.subscribe(params => {
      this._level = parseInt(params['level']);
    });

    this.reset();

    this._updateSub = setInterval(() => {
      this.UIUpdate();
    }, 1);
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
    this.cursorMapX = this.cursorMapX;
    this.cursorMapY = this.cursorMapY;
    //
    this.attackers.forEach(attacker => {
      if(attacker.spawned && attacker.alive){
        attacker.x = attacker.x;
        attacker.y = attacker.y;
      }
    });

    this.projectiles.forEach(projectile => {
      projectile.x = projectile.x;
      projectile.y = projectile.y;
    });
  }

  ngOnDestroy(){
    clearInterval(this._updateSub);
    this.clear();
    this._routeSub.unsubscribe();
  }

  MouseEnter(){
    this.mouseOverMap = true;
  }

  MouseLeave(){
    this.mouseOverMap = false;
  }

  MouseDown(){
    if(this.selectedDefenderModel == null || !this.canPlaceDefender()){
      return;
    }
    if(this.money < this.selectedDefenderModel.cost){
      return;
    }
    let x = Math.floor(this.cursorMapX);
    let y = Math.floor(this.cursorMapY);

    let px = (x / this.mapWidth) * 100;
    let py = (y / this.mapHeight) * 100;
    let toadd = new Defender(this.selectedDefenderModel, px, py);
    this._defenders.push(toadd);
    this.defendersMap.set(toadd, []);
    this.money -= this.selectedDefenderModel.cost;
    this.selectedDefenderModel = null;
    if(this.gameStarted){
      this.zone.runOutsideAngular(() => {
        this.defenderFunc(toadd);
      });
    }
  }

  canPlaceDefender() : boolean {
    if(this.selectedDefenderModel == null){
      return false;
    }

    if(this.money < this.selectedDefenderModel!.cost){
      return false;
    }

    let x = Math.floor(this.cursorMapX);
    let y = Math.floor(this.cursorMapY);

    let vh = window.visualViewport?.height;
    let vw = window.visualViewport?.width;

    let defw = (((3 * vh!) / 100) + ((3 * vw!) / 100)) / 2;
    let defr = defw / 2;

    for(let dir of [[0,0],[0,1],[1,0],[0,-1],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]]){

      let cx = x + dir[0] * defr;
      let cy = y + dir[1] * defr;

      let hbheight = (((60 * vw!) / 100 + (60 * vh!) / 100) / 2) / this._levelModel.Height;
      let hbwidth = (((60 * vw!) / 100 + (60 * vh!) / 100) / 2) / this._levelModel.Width;

      let actualh = Math.floor(cy / hbheight);
      let actualw = Math.floor(cx / hbwidth);

      if(actualh < 0 || actualh >= this._levelModel.Height || actualw < 0 || actualw >= this._levelModel.Width){
        return false;
      }

      if(this._levelModel.hitboxmap.hitboxes[actualh][actualw] == 1){
        return false;
      }
      
    }

    return true;
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

  SelectExisting(defender: Defender){
    if(this.selectedDefender == defender){
      this.selectedDefender = null;
      return;
    }
    this.selectedDefender = defender;
  }

  SellDefender(defender: Defender){
    this.money += defender.SellValue();
    defender.active = false;
    this._defenders = this._defenders.filter((def) => def != defender);
    this.selectedDefender = null;
    this.defendersMap.delete(defender);
  }

  UpgradeDefender(defender: Defender, upgrade: DefenderUpgrade){
    if(this.money < upgrade.cost){
      return;
    }
    defender.GetUpgrade(upgrade);
    this.money -= upgrade.cost;
  }

  GetTileHeight() : string{
    return `calc(((${this.gameVW}vw + ${this.gameVH}vh) / 2) / ${this._levelModel.Height})`;
  }

  GetTileWidth() : string{
    return `calc(((${this.gameVW}vw + ${this.gameVH}vh) / 2) / ${this._levelModel.Width})`;
  }

  GetViewRangeRadius(range: number) : string {
    let width = (range / 100) * this.gameVW * 2;
    return `calc((${width}vw + ${width}vh) / 2)`;
  }

  gameStarted = false;
  start(){
    this.gameStarted = true;
    this.runDefenders();
    this.zone.runOutsideAngular(() => this.spawnEnemies())
  }

  private _spawninterval = 1;
  async spawnEnemies(){

    while(this.attackers.some(att => !att.spawned) && this.gameStarted){

      let attacker = this.attackers.find(att => !att.spawned)!;
      let sp = this._levelModel.GetRandomSpawnpoint();
      attacker.SetSpawnPoint(sp.x, sp.y);
      attacker.Lifetime(this._levelModel.Pathing);
      
      let deathsub = attacker.death.subscribe(() => {
        this.defendersMap.forEach((targets) => {
          if(targets.includes(attacker)){
            targets.splice(targets.indexOf(attacker), 1);
          }
        });
      });
      this._attackerSubs.push(deathsub);

      this.hbcheck(attacker);

      await new Promise(r => setTimeout(r, this._spawninterval));
    }

    
  }

  async runDefenders(){
    this.zone.runOutsideAngular(() => {
      this.defenders.forEach(defender => {
        if(!defender.active){
          this.defenderFunc(defender);
        }
      });
    })
  }

  async hbcheck(att : Attacker){
    while(att.alive){
      let x = att.x;
      let y = att.y;
  
      this.defenders.forEach(defender => {
        let defradius = defender.range;
        let dist = (defender.x - x) * (defender.x - x) + (defender.y - y) * (defender.y - y);
        if(dist < (defradius + att.hitboxRadius) * (defradius + att.hitboxRadius)){
          if(!this.defendersMap.get(defender)!.includes(att)){
            this.defendersMap.get(defender)!.push(att);
          }
        }
        else{
          if(this.defendersMap.get(defender)!.includes(att)){
            this.defendersMap.get(defender)!.splice(this.defendersMap.get(defender)!.indexOf(att), 1);
          }
        }
      });

      await new Promise(r => setTimeout(r, 25));
    }
  }

  async projhbcheck(projectile: Projectile){

    let effect = projectile.GetFinishEffect();

    while(!projectile.finished){

      await new Promise(r => setTimeout(r, 10));

      this.attackers.forEach(attacker => {
        if(!attacker.alive || !attacker.spawned || projectile.finished){
          return;
        }
        let x = attacker.x;
        let y = attacker.y;
        let dist = (projectile.x - x) * (projectile.x - x) + (projectile.y - y) * (projectile.y - y);

        if(dist + 16 < (projectile.hitboxRadius + attacker.hitboxRadius) * (projectile.hitboxRadius + attacker.hitboxRadius)){
          projectile.finished = true;
          if(effect.area == DamageArea.Direct){
            effect.effects.forEach(eff => {
              attacker.TakeHit(eff);
            });
          }
        }
      });
    }

    if(effect.area == DamageArea.Direct){
      return;
    }

  

    this.showAOE(effect, {x: projectile.x, y: projectile.y});

    this.attackers.forEach(attacker => {
      if(!attacker.alive || !attacker.spawned){
        return;
      }
      let x = attacker.x;
      let y = attacker.y;
      let dist = (projectile.x - x) * (projectile.x - x) + (projectile.y - y) * (projectile.y - y);
      if(dist < (effect.radius + attacker.hitboxRadius) * (effect.radius + attacker.hitboxRadius)){
        effect.effects.forEach(eff => {
          attacker.TakeHit(eff);
        });
      }
    });
    
  }

  async showAOE(aoe: FinalEffect, position: {x: number, y: number}){

    let topush = {
      position,
      radius: aoe.radius,
      class: aoe.effects[0].type.toString()
    };

    this.AOES.push(topush);

    await new Promise(r => setTimeout(r, 300));

    this.AOES.splice(this.AOES.indexOf(topush), 1);
  }

  async defenderFunc(defender: Defender){
    defender.active = true;
    while(defender.active){
      let attackers = this.defendersMap.get(defender)!;

      if(attackers.length > 0){
        let fired_projectiles = defender.GetProjectilesFiredAt(attackers);
        fired_projectiles.forEach(p => {
          p.SetSpawnPoint(defender.x, defender.y);
          this.projectiles.push(p);
          p.Lifetime();
          this.projhbcheck(p);
          defender.angle = p.angle;
        });       
        await new Promise(r => setTimeout(r, 1000 / defender.attack_speed));
      }
      else{
        await new Promise(r => setTimeout(r, 25));
      }
    }
  }

  reset(){
    this.gameStarted = false;
    this.clear();
    this.reinit();
    this.money = 550;
    this.currentRound = 0;
  }

  reinit(){
    this._levelModel = this.engine.Levels[this._level - 1];
    this._defenders = [];
    this._attackers = this._levelModel.GetRandomAttackers();
    this._spawninterval = this._levelModel.spawnInterval;
  }

  clear(){
    this.defenders.forEach(defender => {
      defender.active = false;
    });

    this.attackers.forEach(attacker => {
      attacker.alive = false;
      attacker.spawned = false;
    });

    this._attackerSubs.forEach(sub => {
      sub.unsubscribe();
    });

    this.projectiles.forEach(projectile => {
      projectile.finished = true;
    });

    this.defendersMap.clear();
    this._defenders = [];
    this._attackers = [];
    this._projectiles = [];
  }
}
