import { Attacker } from "../attackers/attacker";
import { ProjectileModel } from "./projectile-model";

export class Projectile {
    public x: number = 0;
    public y: number = 0;
    public target: {x: number, y: number} | Attacker;
    public model: ProjectileModel;
    public angle: number = 0;
    public finished = false;
    public get image(){
        return this.model.image;
    }

    public get hitboxRadius(){
        return 3;
    }

    public constructor(target: {x: number, y: number} | Attacker, model: ProjectileModel){
        this.target = target;
        this.model = model;
    }

    async Lifetime(){
        while(!this.finished){
            let dx = this.target.x - this.x;
            let dy = this.target.y - this.y;
            this.angle = Math.atan2(dy, dx);

            this.x += (this.model.speed) * Math.cos(this.angle);
            this.y += (this.model.speed) * Math.sin(this.angle);
            
            let dist = dx * dx + dy * dy;
            
            if(dist < 1){
                
                this.finished = true;
                break;
            }

            await new Promise(r => setTimeout(r, 17));
        }
    }

    SetSpawnPoint(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}