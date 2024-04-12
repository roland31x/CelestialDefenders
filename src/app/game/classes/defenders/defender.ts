import { Attacker } from "../attackers/attacker";
import { DefenderUpgrade } from "./defender-upgrades";
import { Projectile } from "../projectiles/projectile";

export class Defender{
    public readonly model: DefenderModel;
    public readonly x: number;
    public readonly y: number;
    private _upgrades: DefenderUpgrade[] = [];

    public active = false;
    public angle = 0;

    get availableUpgrades() : DefenderUpgrade[] {
        return this.model.availableUpgrades.filter(upgrade => !this._upgrades.includes(upgrade));
    }

    FullyUpgraded(){
        return this._upgrades.length == this.model.availableUpgrades.length;
    }

    public GetProjectilesFiredAt(attackers: Attacker[]) {
        return this.model.GetProjectilesFiredAt(attackers, this._upgrades);
    }

    get damage() : number{
        let damage = this.model.damage;
        for(let upgrade of this._upgrades){
            damage += upgrade.damage_mod;
        }
        return damage;
    }

    get range() : number{
        let range = this.model.range;
        for(let upgrade of this._upgrades){
            range += upgrade.range_mod;
        }
        return range;
    }

    get attack_speed() : number{
        let attack_speed = this.model.attack_speed;
        for(let upgrade of this._upgrades){
            attack_speed += upgrade.attack_speed_mod;
        }
        return attack_speed;
    }

    get name() : string{
        return this.model.name;
    }

    constructor(model: DefenderModel, x: number, y: number){
        this.x = x;
        this.y = y;
        this.model = model;
    }

    public GetUpgrade(upgrade : DefenderUpgrade) {
        this._upgrades.push(upgrade);
    }

    public SellValue() : number{
        let base = Math.round(this.model.cost * 80 / 100);
        let upgrades = 0;
        for(let upgrade of this._upgrades){
            upgrades += upgrade.cost * 80 / 100;
        }
        return base + upgrades;
    }
}

export abstract class DefenderModel{
    public damage: number = 0;
    public attack_speed: number = 0;
    public range: number = 0;
    public cost: number = 0;
    public name: string = "defender";
    public abstract image: string;
    public description: string = "A basic defender."

    public availableUpgrades : DefenderUpgrade[] = [];


    public constructor(damage: number, range: number, cost: number, attack_speed: number, name: string){
        this.damage = damage;
        this.range = range;
        this.cost = cost;
        this.name = name;
        this.attack_speed = attack_speed;
    }

    public abstract GetProjectilesFiredAt(attackers: Attacker[], upgrades: DefenderUpgrade[]) : Projectile[];
}

