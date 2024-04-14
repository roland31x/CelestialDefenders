import { Attacker } from "../../attackers/attacker";
import { Projectile } from "../../projectiles/projectile";
import { AOEMagicBall, FireBall, FreezeBall } from "../../projectiles/projectile-models";
import { DefenderModel } from "../defender";
import { DefenderUpgrade, ExtraAOERange, ExtraAttackSpeed, ExtraDamage, ExtraRange } from "../defender-upgrades";

export class ArchmageModel extends DefenderModel {
    public override readonly image = "url(assets/defenders/archmage.png)";

    public constructor(){
        super(35, 20, 1500, 0.5, "Archmage");
        this.availableUpgrades = [new ExtraDamage(5, 500), new ExtraAttackSpeed(0.25, 500), new ExtraAOERange(5, 750)];
        this.description = "A powerful mage that casts a devastating magic missile which explodes dealing massive damage to all enemies in a big area.";
    }

    public override GetProjectilesFiredAt(attackers: Attacker[], upgrades: DefenderUpgrade[]) : Projectile[]{
        let projectiles : Projectile[] = [];
        
        if(attackers.length == 0){
            return projectiles;
        }
        
        let farthest_path = attackers[0];
        attackers.forEach(attacker => {
            if(attacker.PathIdx > farthest_path.PathIdx){
                farthest_path = attacker;
            }
        });
        let target = farthest_path;

        let actual_damage = this.damage;
        upgrades.forEach(upgrade => {
            actual_damage += upgrade.damage_mod;
        });

        let actual_radius = 10;
        upgrades.forEach(upgrade => {
            actual_radius += upgrade.aoe_radius_mod;
        });

        let projectile = new Projectile(target, new AOEMagicBall(actual_damage, actual_radius));
        
        projectiles.push(projectile);

        return projectiles;
    }
}