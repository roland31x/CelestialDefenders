import { Attacker } from "../attackers/attacker";
import { FinalEffect } from "./effects/final-effect";
import { ProjectileModel } from "./projectile-models";

export class Projectile {
    public x: number = 0;
    public y: number = 0;
    public target: {x: number, y: number} | Attacker;
    public angle: number = 0;
    public finished = false;

    public readonly model: ProjectileModel;

    public get speed(){
        return this.model.speed;
    }
    public get damage(){
        return this.model.damage;
    }
    public get image(){
        return this.model.image;
    }

    public get hitboxRadius(){
        return this.model.hb_radius;
    }

    constructor(target: {x: number, y: number} | Attacker, model: ProjectileModel){
        this.target = target;
        this.model = model;
    }

    async Lifetime(){
        while(!this.finished){
            let dx = this.target.x - this.x;
            let dy = this.target.y - this.y;
            this.angle = Math.atan2(dy, dx);

            this.x += (this.speed) * Math.cos(this.angle);
            this.y += (this.speed) * Math.sin(this.angle);
            
            let dist = dx * dx + dy * dy;
            
            if(dist < 1){
                
                this.finished = true;
                break;
            }

            await new Promise(r => setTimeout(r, 17));
        }
    }

    public GetFinishEffect() : FinalEffect{
        return this.model.GetFinishEffect();
    }

    SetSpawnPoint(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}