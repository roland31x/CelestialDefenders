import { Attacker } from "../attackers/attacker";

export abstract class ProjectileModel{
    public speed: number;
    public damage: number;
    public image: string = "url(assets/defenders/archer.png)";
    
    constructor(speed: number, damage: number){
        this.speed = speed;
        this.damage = damage;
    }
}

export class Arrow extends ProjectileModel{
    constructor(damage: number){
        super(0.77, damage);
    }
}

export class Bomb extends ProjectileModel{
    constructor(damage: number){
        super(0.5, damage);
    }
}