import { Attacker } from "../../attackers/attacker";
import { Projectile } from "../../projectiles/projectile";
import { AOEStunBall, FreezeBall } from "../../projectiles/projectile-models";
import { DefenderModel } from "../defender";
import { DefenderUpgrade, ExtraAOERange, ExtraAttackSpeed, ExtraDuration } from "../defender-upgrades";

export class BinderModel extends DefenderModel {
    public override readonly image = "url(assets/defenders/binder.png)";

    public constructor(){
        super(0, 18, 150, 0.25, "Binder");
        this.availableUpgrades = [new ExtraAttackSpeed(0.25, 300), new ExtraAOERange(3, 300), new ExtraDuration(750, 500)];
        this.description = "An apprentice mage that casts a homing magic missile stunning enemies in a small area for 1.25s seconds. Targets the furthest progressed enemy.";
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

        let actual_duration = 1.25;
        upgrades.forEach(upgrade => {
            actual_duration += upgrade.duration_mod;
        });

        let actual_radius = 5;
        upgrades.forEach(upgrade => {
            actual_radius += upgrade.aoe_radius_mod;
        });

        let projectile = new Projectile(target, new AOEStunBall(actual_duration, actual_radius));

        projectiles.push(projectile);

        return projectiles;
    }
}