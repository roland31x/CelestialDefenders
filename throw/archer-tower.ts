import { DefenderModel } from "../defender";
import { ExtraDamage } from "../defender-upgrades";
import { ExtraRange } from "../defender-upgrades";
import { ExtraAttackSpeed } from "../defender-upgrades";
import { Arrow, Projectile } from "../projectiles/projectile-model";

export class ArcherTowerModel extends DefenderModel{
    public constructor(){
        super(6, 10, 2200, 1.5, "Archer Tower");
        this.availableUpgrades = [new ExtraDamage(), new ExtraAttackSpeed()];
        this.image = "url(assets/defenders/archer.png)";
        this.description = "An advanced entity that houses multiple archers capable of shooting up to 4 targets within range.";
    }
    public GetFiredProjectiles(): Projectile[] {
        return [ new Arrow(this.damage) ]
    }
}