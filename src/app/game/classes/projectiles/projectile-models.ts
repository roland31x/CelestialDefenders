import { Attacker } from "../attackers/attacker";
import { Effect, FireDamageEffect, FreezeEffect, MagicDamageEffect, PhysicalDamageEffect, PoisonEffect } from "./effects/effect-base";
import { DamageArea, DamageType, HitEffect } from "./effects/effect-enums";
import { FinalEffect } from "./effects/final-effect";
import { Projectile } from "./projectile";

export class Arrow extends Projectile{
    public override readonly image = "url(assets/projectiles/arrow.png)";

    constructor(target: {x: number, y: number} | Attacker, damage: number){
        super(target, 0.6, damage);
    }

    public override GetFinishEffect(): FinalEffect {
        let effects = [
            new PhysicalDamageEffect(this.damage),
        ];

        return new FinalEffect(DamageArea.Direct, 0, effects);
    }
}

export class FireArrow extends Projectile{
    public override readonly image = "url(assets/projectiles/firearrow.png)";

    constructor(target: {x: number, y: number} | Attacker, damage: number){
        super(target, 0.6, damage);
    }

    public override GetFinishEffect(): FinalEffect {
        let effects = [
            new PhysicalDamageEffect(this.damage),
            new FireDamageEffect(this.damage / 3, 5000, 1000),
        ];

        return new FinalEffect(DamageArea.Direct, 0, effects);
    }

}

export class Bomb extends Projectile{
    public override readonly image = "url(assets/projectiles/bomb.png)";

    constructor(target: {x: number, y: number} | Attacker, damage: number){
        super(target, 0.2, damage);
    }

    public override GetFinishEffect(): FinalEffect {

        let effects = [
            new PhysicalDamageEffect(this.damage),
        ];

        return new FinalEffect(DamageArea.AreaOfEffect, 6, effects);
    }
}

export class MagicBall extends Projectile{
    public override readonly image = "url(assets/projectiles/magicball.png)";

    constructor(target: {x: number, y: number} | Attacker, damage: number){
        super(target, 0.55, damage);
    }
    
    public override GetFinishEffect(): FinalEffect {

        let effects = [
            new MagicDamageEffect(this.damage),
        ];

        return new FinalEffect(DamageArea.Direct, 0, effects);
    }
}

export class FreezeBall extends Projectile{
    public override readonly image = "url(assets/projectiles/freezeball.png)";

    constructor(target: {x: number, y: number} | Attacker){
        super(target, 0.55, 0);
    }
    
    public override GetFinishEffect(): FinalEffect {

        let effects = [
            new FreezeEffect(2.5)
        ];

        return new FinalEffect(DamageArea.Direct, 0, effects);
    }
}

export class PoisonDart extends Projectile{
    public override readonly image = "url(assets/projectiles/poisondart.png)";

    constructor(target: {x: number, y: number} | Attacker, damage: number){
        super(target, 0.70, damage);
    }
    
    public override GetFinishEffect(): FinalEffect {

        let effects = [
            new PoisonEffect(this.damage, 5000, 1000)
        ];

        return new FinalEffect(DamageArea.Direct, 0, effects);
    }
}