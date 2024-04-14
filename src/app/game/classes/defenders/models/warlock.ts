import { Attacker } from "../../attackers/attacker";
import { Projectile } from "../../projectiles/projectile";
import { AOEPoisonBall } from "../../projectiles/projectile-models";
import { DefenderModel } from "../defender";
import { DefenderUpgrade, ExtraAOERange, ExtraAttackSpeed, ExtraDamage, ExtraDuration } from "../defender-upgrades";

export class WarlockModel extends DefenderModel {
    public override readonly image = "url(assets/defenders/warlock.png)";

    public constructor(){
        super(18, 16, 800, 0.5, "Warlock");
        this.availableUpgrades = [new ExtraDamage(5, 500), new ExtraAttackSpeed(0.25, 500), new ExtraDuration(1500, 600), new ExtraAOERange(3, 750)];
        this.description = "Casts a powerful spell that poisons enemies in a small area dealing damage over time. Especially effective against large groups of enemies.";
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

        let actual_radius = 5;
        upgrades.forEach(upgrade => {
            actual_radius += upgrade.aoe_radius_mod;
        });

        let duration = 2500;
        upgrades.forEach(upgrade => {
            duration += upgrade.duration_mod;
        });

        let projectile = new Projectile(target, new AOEPoisonBall(actual_damage, duration, actual_radius));

        projectiles.push(projectile);

        return projectiles;
    }
}