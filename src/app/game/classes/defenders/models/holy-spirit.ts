import { Attacker } from "../../attackers/attacker";
import { Projectile } from "../../projectiles/projectile";
import { FireBall } from "../../projectiles/projectile-models";
import { DefenderModel } from "../defender";
import { DefenderUpgrade, ExtraAttackSpeed, ExtraDuration, ExtraDamage, ExtraRange } from "../defender-upgrades";

export class HolySpiritModel extends DefenderModel {
    public override readonly image = "url(assets/defenders/divine.png)";

    public constructor(){
        super(50, 20, 2500, 0.15, "Holy Spirit");
        this.availableUpgrades = [new ExtraRange(5, 1000), new ExtraAttackSpeed(0.15, 1000), new ExtraDuration(2000, 1200)];
        this.description = "A divine spirit that blasts the largest enemy in it's range with a powerful fireball that leaves the target on fire.";
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

        let dot_duration = 5000;
        upgrades.forEach(upgrade => {
            dot_duration += upgrade.duration_mod;
        });

        let projectile = new Projectile(target, new FireBall(actual_damage, dot_duration))

        projectiles.push(projectile);

        return projectiles;
    }
}