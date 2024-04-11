import { Attacker } from "../attackers/attacker";
import { FinalEffect } from "./effects/final-effect";

export abstract class Projectile {
    public x: number = 0;
    public y: number = 0;
    public target: {x: number, y: number} | Attacker;
    public angle: number = 0;
    public finished = false;

    public readonly speed: number;
    public readonly damage: number;
    public readonly abstract image: string;

    public get hitboxRadius(){
        return 3;
    }

    constructor(target: {x: number, y: number} | Attacker, speed: number, damage: number){
        this.target = target;
        this.speed = speed;
        this.damage = damage;
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

    public abstract GetFinishEffect() : FinalEffect;

    SetSpawnPoint(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}