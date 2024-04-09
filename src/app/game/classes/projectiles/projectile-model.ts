import { Attacker } from "../attackers/attacker";

export abstract class ProjectileModel{
    public speed: number;
    public damage: number;
    public abstract image: string;
    
    constructor(speed: number, damage: number){
        this.speed = speed;
        this.damage = damage;
    }
}

export class Arrow extends ProjectileModel{
    public override image = "url(assets/projectiles/arrow.png)";

    constructor(damage: number){
        super(0.6, damage);
    }
}

export class Bomb extends ProjectileModel{
    public override image = "url(assets/projectiles/bomb.png)";

    constructor(damage: number){
        super(0.2, damage);
    }
}

export class MagicBall extends ProjectileModel{
    public override image = "url(assets/projectiles/magicball.png)";

    constructor(damage: number){
        super(0.3, damage);
    }
}