import { AttackerModel } from "./attacker-model";

export class Attacker{
    public x: number = 0;
    public y: number = 0;
    public spawned: boolean = false;
    public alive: boolean = false;
    public readonly model : AttackerModel;
    public angle: number = 0;

    public get hitboxRadius(){
        return 2.33 * this.scale;
    }

    public _currenthealth: number = 9999;

    public get scale(){
        return this.model.sizeScale;
    }
    public get image(){
        return this.model.image;
    }
    public get health(){
        return this._currenthealth;
    }
    public set health(value: number){
        this._currenthealth = value;
    }


    public get speed(){
        return this.model.speed;
    }

    private _pathidx: number = -1;
    public get PathIdx(){
        return this._pathidx;
    }

    public constructor(model: AttackerModel){
        this.model = model;
        this._currenthealth = model.health;
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
        while(this.alive){
            this.Move();
            if(Math.abs(this.x - nextpath[random].x) < 4 && Math.abs(this.y - nextpath[random].y) < 4){
                this._pathidx++;
                if(this._pathidx >= paths.size + 1){
                    while(this.alive && Math.abs(this.x - nextpath[random].x) < 0.5 && Math.abs(this.y - nextpath[random].y) < 0.5){
                        this.Move();
                    }
                    this.alive = false;
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

    public SetSpawnPoint(x: number, y: number){
        this.x = x;
        this.y = y;
        this.spawned = true;
    }
}