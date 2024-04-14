import { Attacker } from "../../attackers/attacker";
import { DefenderModel } from "../defender";
import { DefenderUpgrade, ExtraDamage, HomingUpgrade } from "../defender-upgrades";
import { ExtraRange } from "../defender-upgrades";
import { ExtraAttackSpeed } from "../defender-upgrades";
import { Projectile } from "../../projectiles/projectile";
import { MagicBall, ProjectileModel } from "../../projectiles/projectile-models";

export class ApprenticeModel extends DefenderModel{
    public override readonly image = "url(assets/defenders/apprentice.png)";

    public constructor(){
        super(6, 12, 150, 1, "Apprentice");
        this.availableUpgrades = [new ExtraDamage(6, 150), new ExtraRange(3,150), new HomingUpgrade(250), new ExtraAttackSpeed(0.5,400)];
        this.description = "An apprentice that fires a magic basic magic missile. Targets the furthest progressed enemy.";
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
        let target_x = target.x;
        let target_y = target.y;

        let actual_damage = this.damage;
        upgrades.forEach(upgrade => {
            actual_damage += upgrade.damage_mod;
        });

        let model: ProjectileModel;
        model = new MagicBall(actual_damage);

        let homing = false;
        upgrades.forEach(upgrade => {
            if(upgrade instanceof HomingUpgrade){
                homing = true;
            }
        });

        let projectile = new Projectile(homing ? target : {x: target_x, y: target_y}, model);

        projectiles.push(projectile);

        return projectiles;
    }
}