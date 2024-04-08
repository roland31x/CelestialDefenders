export class Attacker{
    public x: number = 0;
    public y: number = 0;
    public spawned: boolean = false;
    public alive: boolean = false;
    public health: number;
    public speed: number;
    public damage: number;
    public angle: number = 0;
    public image: string = "url(assets/defenders/archer.png)";

    private _pathidx: number = -1;
    public get PathIdx(){
        return this._pathidx;
    }

    public constructor(health: number, speed: number, damage: number, image: string){
        this.health = health;
        this.speed = speed;
        this.damage = damage;
        this.image = image;
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
            await new Promise(r => setTimeout(r, 1));
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