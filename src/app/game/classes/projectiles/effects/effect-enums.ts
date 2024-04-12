import { Effect } from "./effect-base";

export enum HitEffect {
    Slow,
    Freeze,
    DamageOverTime,
    Damage,
}

export enum DamageArea{
    Direct,
    AreaOfEffect,
}

export enum DamageType{
    Magical = "url(assets/explosions/blue.png)",
    Fire = "url(assets/explosions/fire.png)",
    Ice = "url(assets/explosions/ice.png)",
    Poison = "url(assets/explosions/green.png)",
    Curse = "url(assets/explosions/purple.png)",
}

export function GetHitEffectString(effect: Effect){
    switch(effect.effect){
        case HitEffect.Damage:
            return "Hit";
        case HitEffect.Slow:
            return "Slowed";
        case HitEffect.DamageOverTime:
            switch(effect.type){
                case DamageType.Magical:
                    return "Hit";
                case DamageType.Fire:
                    return "OnFire";
                case DamageType.Ice:
                    return "Frozen";
                case DamageType.Poison:
                    return "Poisoned";
                case DamageType.Curse:
                    return "Cursed";
            }
        case HitEffect.Freeze:
            return "Frozen";
    }
}