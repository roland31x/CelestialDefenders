import { Subject } from "rxjs";
import { StatModifier } from "./stat-modifier";
import { HitEffect, GetHitEffectString } from "../projectiles/effects/effect-enums";
import { Effect } from "../projectiles/effects/effect-base";

export abstract class Attacker{
    public x: number = 0;
    public y: number = 0;
    public spawned: boolean = false;
    public alive: boolean = false;
    public angle: number = 0;
    protected _currenthealth: number = 9999;

    public death: Subject<void> = new Subject<void>();
    public finish: Subject<void> = new Subject<void>();

    public readonly maxhealth: number;
    public readonly base_speed: number;
    public get speed(){
        let speed = this.base_speed;
        for(let mod of this.statModifiers){
            speed *= (100 - mod.speed_mod) / 100;
        }
        return speed;
    }
    public abstract readonly image: string;
    public readonly scale: number = 1;
    public readonly zindex: number = 10;

    public readonly statModifiers: StatModifier[] = [];

    public readonly CurrentEffects: string[] = [];
    public get cssEffects(){
        return this.CurrentEffects.join(" ");
    }

    public get hitboxRadius(){
        return 2.33 * this.scale;
    }

    public get hpPercent(){
        let ret = this._currenthealth / this.maxhealth * 100;
        if(ret < 0){
            return 0;
        }
        return ret;
    }

    public get hpColor() : string{
        if(this.hpPercent > 75){
            return "green";
        }
        else if(this.hpPercent > 50){
            return "yellow";
        }
        else if(this.hpPercent > 25){
            return "orange";
        }
        else{
            return "red";
        }
    }

    private _deathanimation = false;
    public set health(value: number){
        if(this._deathanimation){
            return;
        }
        this._currenthealth = value;
        if(this._currenthealth <= 0 && this.alive){
            this._deathanimation = true;
            this.CurrentEffects.push("Dying");
            setTimeout(() => {this.alive = false; this.death.next();}, 250);
        }
    }
    
    public get health(){
        return this._currenthealth;
    }

    private _pathidx: number = -1;
    public get PathIdx(){
        return this._pathidx;
    }

    public constructor(health: number, speed: number){
        this.base_speed = speed;
        this.maxhealth = health;
        this._currenthealth = health;
    }

    public MoveToward(x: number, y: number){
        let dx = x - this.x;
        let dy = y - this.y;
        this.angle = Math.atan2(dy, dx);
    }

    public async Lifetime(paths: Map<number, {x: number, y: number}[]>){
        this.alive = true;
        this._pathidx = 1;
        let nextpath = paths.get(this._pathidx)!;
        let random = Math.floor(Math.random() * nextpath.length);
        this.MoveToward(nextpath[random].x, nextpath[random].y);
        while(this.alive && !this._deathanimation){
            this.Move();
            if(Math.abs(this.x - nextpath[random].x) < 6 && Math.abs(this.y - nextpath[random].y) < 6){
                this._pathidx++;
                if(this._pathidx >= paths.size + 1){
                    while(this.alive && Math.abs(this.x - nextpath[random].x) < 0.5 && Math.abs(this.y - nextpath[random].y) < 0.5){
                        this.Move();
                    }
                    this.alive = false;
                    this.finish.next();
                    break;
                }
                nextpath = paths.get(this._pathidx)!;
                random = Math.floor(Math.random() * nextpath.length);
                this.MoveToward(nextpath[random].x, nextpath[random].y);
            }
            await new Promise(r => setTimeout(r, 17));
        }
    }
    public Move(){
        this.x += (this.speed) * Math.cos(this.angle);
        this.y += (this.speed) * Math.sin(this.angle);
    }

    public TakeHit(effect : Effect){
        if(this._deathanimation){
            return;
        }

        switch(effect.effect){
            case HitEffect.Damage:
                this.health -= effect.amount;
                this.CurrentEffects.push("Hit");
                setTimeout(() => {
                    this.CurrentEffects.splice(this.CurrentEffects.indexOf("Hit"), 1);
                }, 100);     
                break;
            case HitEffect.Slow:
                let add = new StatModifier(effect.amount);
                this.statModifiers.push(add);
                this.CurrentEffects.push("Slowed");
                setTimeout(() => {
                    this.statModifiers.splice(this.statModifiers.indexOf(add), 1);
                    this.CurrentEffects.splice(this.CurrentEffects.indexOf("Slowed"), 1);
                }, effect.duration);

                break;
            case HitEffect.DamageOverTime:

                let interval = setInterval(() => {
                    this.health -= effect.amount;
                    let hittype = GetHitEffectString(effect);
                    this.CurrentEffects.push(hittype);
                    setTimeout(() => {
                        this.CurrentEffects.splice(this.CurrentEffects.indexOf(hittype), 1);
                    }, 100);
                }, effect.tickrate);

                setTimeout(() => {
                    clearInterval(interval);
                }, effect.duration);

                break;
            case HitEffect.Freeze:
                let add2 = new StatModifier(100);
                this.statModifiers.push(add2);
                this.CurrentEffects.push("Frozen");
                setTimeout(() => {
                    this.statModifiers.splice(this.statModifiers.indexOf(add2), 1);
                    this.CurrentEffects.splice(this.CurrentEffects.indexOf("Frozen"), 1);
                }, effect.duration);

                break;
        }
    }

    public SetSpawnPoint(x: number, y: number){
        this.x = x;
        this.y = y;
        this.spawned = true;
    }
    
}