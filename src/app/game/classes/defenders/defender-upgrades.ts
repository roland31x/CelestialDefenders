// Description: This file contains the defender upgrade classes for the game.
export abstract class DefenderUpgrade {
    public readonly cost: number;
    public readonly damage_mod: number = 0;
    public readonly range_mod: number = 0;
    public readonly attack_speed_mod: number = 0;
    public readonly aoe_radius_mod: number = 0;
    public readonly duration_mod: number = 0;
    public readonly name: string;
    public readonly homing_mod: boolean = false;
    public constructor(cost: number, name: string, { damage = 0, range = 0, attack_speed = 0, duration = 0, aoe_radius = 0, homing = false}){
        this.cost = cost;
        this.name = name;
        if(damage){
            this.damage_mod = damage;
        }
        if(range){
            this.range_mod = range;
        }
        if(attack_speed){
            this.attack_speed_mod = attack_speed;
        }
        if(duration){
            this.duration_mod = duration;
        }
        if(aoe_radius){
            this.aoe_radius_mod = aoe_radius;
        }
        if(homing){
            this.homing_mod = homing;
        }
    }
}

export class ExtraRange extends DefenderUpgrade{
    public constructor(rangemod: number, cost: number){
        super(cost, "Extra Range", { range: rangemod });
    }
}

export class ExtraDamage extends DefenderUpgrade{
    public constructor(damagemod: number, cost: number){
        super(cost, "Extra Damage", { damage: damagemod });
    }
}

export class ExtraAttackSpeed extends DefenderUpgrade{
    public constructor(attspeedmod: number, cost: number){
        super(cost, "Extra Attack Speed", { attack_speed: attspeedmod });
    }
}

export class HomingUpgrade extends DefenderUpgrade{
    public constructor(cost: number){
        super(cost, "Homing Missiles", { homing: true });
    }
}

export class ExtraAOERange extends DefenderUpgrade{
    public constructor(aoe_range_mod: number, cost: number){
        super(cost, "Extra AOE Range", { aoe_radius: aoe_range_mod });
    }
}

export class ExtraDuration extends DefenderUpgrade{
    public constructor(duration_mod: number, cost: number){
        super(cost, "Extra Duration", { duration: duration_mod });
    }
}