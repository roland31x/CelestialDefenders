import { HitEffect, DamageType } from "./effect-enums";

export abstract class Effect {
    public readonly effect: HitEffect;
    public readonly type: DamageType;
    public readonly duration: number = 0;
    public readonly amount: number = 0;
    public readonly tickrate: number = 0;

    constructor(effect: HitEffect, type: DamageType, amount?: number, duration?: number, tickrate?: number) {
        this.effect = effect;
        if (duration) {
            this.duration = duration;
        }
        if (amount) {
            this.amount = amount;
        }
        if (tickrate) {
            this.tickrate = tickrate;
        }
        this.type = type;
    }
}

export class PhysicalDamageEffect extends Effect {
    constructor(amount: number) {
        super(HitEffect.Damage, DamageType.Physical, amount);
    }
}

export class BleedEffect extends Effect {
    constructor(amount: number, duration: number, tickrate: number) {
        super(HitEffect.DamageOverTime, DamageType.Physical, amount, duration, tickrate);
    }
}

export class FreezeEffect extends Effect {
    constructor(duration: number) {
        super(HitEffect.Freeze, DamageType.Magical, 0, duration);
    }
}

export class MagicDamageEffect extends Effect {
    constructor(amount: number) {
        super(HitEffect.Damage, DamageType.Magical, amount);
    }
}

export class PoisonEffect extends Effect {
    constructor(amount: number, duration: number, tickrate: number) {
        super(HitEffect.DamageOverTime, DamageType.Poison, amount, duration, tickrate);
    }
}

export class SlowEffect extends Effect {
    constructor(amount: number, duration: number) {
        super(HitEffect.Slow, DamageType.Physical, amount, duration);
    }
}

export class FireDamageEffect extends Effect {
    constructor(amount: number, duration: number, tickrate: number) {
        super(HitEffect.DamageOverTime, DamageType.Fire, amount, duration, tickrate);
    }
}
