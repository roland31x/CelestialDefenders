import { CurseEffect, FireDamageEffect, FreezeEffect, MagicDamageEffect, PoisonEffect, SlowEffect } from "./effects/effect-base";
import { DamageArea } from "./effects/effect-enums";
import { FinalEffect } from "./effects/final-effect";

export abstract class ProjectileModel{
    public readonly speed: number;
    public readonly damage: number;
    public readonly abstract image: string;
    public readonly hb_radius: number = 3;

    constructor(speed: number, damage: number){
        this.speed = speed;
        this.damage = damage;
        this.hb_radius = 3;
    }

    public abstract GetFinishEffect(): FinalEffect;
}

export class CurseBall extends ProjectileModel{
    public override readonly image = "url(assets/projectiles/magic-ball-purple.png)";
    public override readonly hb_radius = 4;
    private _slow: number;
    private _duration: number;
    private _aoe_radius: number;

    constructor(damage: number, duration: number, slow: number, aoe_radius: number){
        super(0.33, damage);
        this._slow = slow;
        this._duration = duration;
        this._aoe_radius = aoe_radius;
    }

    public override GetFinishEffect(): FinalEffect {
        let effects = [
            new CurseEffect(this.damage / 5, this._duration, 250),
            new SlowEffect(this._slow, this._duration),
        ];

        return new FinalEffect(DamageArea.AreaOfEffect, this._aoe_radius, effects);
    }

}

export class MagicBall extends ProjectileModel{
    public override readonly image = "url(assets/projectiles/magic-ball-base.png)";

    constructor(damage: number){
        super(0.6, damage);
    }

    public override GetFinishEffect(): FinalEffect {
        let effects = [
            new MagicDamageEffect(this.damage),
        ];

        return new FinalEffect(DamageArea.Direct, 0, effects);
    }
}

export class FireBall extends ProjectileModel{
    public override readonly image = "url(assets/projectiles/magic-ball-base.png)";
    public override readonly hb_radius = 6;
    private duration;
    constructor(damage: number, duration: number){
        super(0.5, damage);
        this.duration = duration;
    }

    public override GetFinishEffect(): FinalEffect {
        let effects = [
            new MagicDamageEffect(this.damage),
            new FireDamageEffect(this.damage / 3, this.duration, 500),
        ];

        return new FinalEffect(DamageArea.Direct, 0, effects);
    }

}


export class AOEMagicBall extends ProjectileModel{
    public override readonly image = "url(assets/projectiles/magic-ball-purple-red.png)";
    public override readonly hb_radius = 5;
    private aoe_radius: number;

    constructor(damage: number, radius: number){
        super(0.5, damage);
        this.aoe_radius = radius;
    }
    
    public override GetFinishEffect(): FinalEffect {

        let effects = [
            new MagicDamageEffect(this.damage),
        ];

        return new FinalEffect(DamageArea.AreaOfEffect, this.aoe_radius, effects);
    }
}

export class AOEStunBall extends ProjectileModel{
    public override readonly image = "url(assets/projectiles/magic-ball-purple-red.png)";
    private _stunduration: number;
    private _range: number;
    constructor(duration: number, range: number){
        super(0.55, 0);
        this._stunduration = duration;
        this._range = range;
    }
    
    public override GetFinishEffect(): FinalEffect {

        let effects = [
            new MagicDamageEffect(0),
            new FreezeEffect(this._stunduration)
        ];

        return new FinalEffect(DamageArea.AreaOfEffect, this._range, effects);
    }

}

export class FreezeBall extends ProjectileModel{
    public override readonly image = "url(assets/projectiles/magic-ball-frost.png)";
    private _freezeduration: number;
    constructor(duration: number){
        super(0.78, 0);
        this._freezeduration = duration;
    }
    
    public override GetFinishEffect(): FinalEffect {

        let effects = [
            new FreezeEffect(this._freezeduration)
        ];

        return new FinalEffect(DamageArea.Direct, 0, effects);
    }
}

export class AOEPoisonBall extends ProjectileModel{
    public override readonly image = "url(assets/projectiles/magic-ball-poison.png)";

    private _aoe_radius: number;
    private _duration: number;
    constructor(damage: number, duration: number, aoe_radius: number){
        super(1, damage);
        this._aoe_radius = aoe_radius;
        this._duration = duration;
    }
    
    public override GetFinishEffect(): FinalEffect {

        let effects = [
            new PoisonEffect(this.damage / 2, this._duration, 500)
        ];

        return new FinalEffect(DamageArea.AreaOfEffect, this._aoe_radius, effects);
    }
}