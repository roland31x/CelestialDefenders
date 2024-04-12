import { Attacker } from "../../attackers/attacker";
import { Projectile } from "../../projectiles/projectile";
import { FreezeBall } from "../../projectiles/projectile-models";
import { DefenderModel } from "../defender";
import { DefenderUpgrade, ExtraAttackSpeed, ExtraDamage, ExtraDuration, ExtraRange } from "../defender-upgrades";

export class FreezerModel extends DefenderModel {
    public override readonly image = "url(assets/defenders/freezer.png)";

    public constructor(){
        super(0, 20, 150, 0.25, "Freezer");
        this.availableUpgrades = [new ExtraRange(3, 150), new ExtraAttackSpeed(0.25, 300), new ExtraDuration(1000, 500) ];
        this.description = "A skilled mage that casts a homing magic missile towards enemies and freezes them for 2 seconds. Targets the fastest enemy.";
    }

    public override GetProjectilesFiredAt(attackers: Attacker[], upgrades: DefenderUpgrade[]) : Projectile[]{
        let projectiles : Projectile[] = [];
        
        if(attackers.length == 0){
            return projectiles;
        }

        let fastest = attackers[0];
        attackers.forEach(attacker => {
            if(attacker.speed > fastest.speed){
                fastest = attacker;
            }
        });

        let target = fastest;

        let actual_duration = 2000;
        upgrades.forEach(upgrade => {
            actual_duration += upgrade.duration_mod;
        });

        let projectile = new Projectile(target, new FreezeBall(actual_duration));

        projectiles.push(projectile);

        return projectiles;
    }
}