import { Attacker } from "../../attackers/attacker";
import { Projectile } from "../../projectiles/projectile";
import { CurseBall } from "../../projectiles/projectile-models";
import { DefenderModel } from "../defender";
import { DefenderUpgrade, ExtraAOERange, ExtraAttackSpeed } from "../defender-upgrades";

export class CurserModel extends DefenderModel {
    public override readonly image = "url(assets/defenders/curser.png)";

    public constructor(){
        super(20, 20, 900, 0.25, "Curser");
        this.availableUpgrades = [ new ExtraAttackSpeed(0.25, 500), new ExtraAOERange(3, 750)];
        this.description = "A powerful necromancer that casts a curse spell cursing and slowing down enemies by 50% for 3 seconds in a small area. Targets the largest enemy.";
    }

    public override GetProjectilesFiredAt(attackers: Attacker[], upgrades: DefenderUpgrade[]) : Projectile[]{
        let projectiles : Projectile[] = [];
        
        if(attackers.length == 0){
            return projectiles;
        }

        let largest = attackers[0];
        attackers.forEach(attacker => {
            if(attacker.maxhealth > largest.maxhealth){
                largest = attacker;
            }
        });

        let target = largest;

        let actual_damage = this.damage;
        upgrades.forEach(upgrade => {
            actual_damage += upgrade.damage_mod;
        });

        let duration = 3000;
        upgrades.forEach(upgrade => {
            duration += upgrade.duration_mod;
        });

        let slow_amount = 50;

        let actual_radius = 5;
        upgrades.forEach(upgrade => {
            actual_radius += upgrade.aoe_radius_mod;
        });

        let projectile = new Projectile(target, new CurseBall(actual_damage, duration, slow_amount, actual_radius));

        projectiles.push(projectile);

        return projectiles;
    }
}