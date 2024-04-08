export abstract class DefenderUpgrade {
    public readonly cost: number;
    public readonly damage_mod: number;
    public readonly range_mod: number;
    public readonly attack_speed_mod: number;
    public readonly name: string;
    public constructor(cost: number, damage: number, range: number, attack_speed: number, name: string){
        this.cost = cost;
        this.damage_mod = damage;
        this.range_mod = range;
        this.attack_speed_mod = attack_speed;
        this.name = name;
    }
}

export class ExtraRange extends DefenderUpgrade{
    public constructor(){
        super(100, 0, 1, 0, "Extra Range");
    }
}

export class ExtraDamage extends DefenderUpgrade{
    public constructor(){
        super(100, 3, 0, 0, "Extra Damage");
    }
}

export class ExtraAttackSpeed extends DefenderUpgrade{
    public constructor(){
        super(100, 0, 0, 0.25, "Extra Attack Speed");
    }
}