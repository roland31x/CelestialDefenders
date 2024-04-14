import { Attacker } from "../../attackers/attacker";
import { Projectile } from "../../projectiles/projectile";
import { AOEMagicBall, MagicBall } from "../../projectiles/projectile-models";
import { DefenderModel } from "../defender";
import { DefenderUpgrade, ExtraAOERange, ExtraAttackSpeed, ExtraDamage, ExtraRange } from "../defender-upgrades";

export class SpellcasterModel extends DefenderModel{
    public override readonly image = "url(assets/defenders/spellcaster.png)";
    public constructor(){
        super(6, 12, 400, 0.75, "Spellcaster");
        this.availableUpgrades = [new ExtraRange(3, 250), new ExtraAttackSpeed(0.25, 300), new ExtraDamage(6, 400), new ExtraAOERange(3, 600)];
        
        this.description = "Fires exploding magic missiles towards enemies. Especially effective against groups of enemies.";
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

        let actual_radius = 6;
        upgrades.forEach(upgrade => {
            actual_radius += upgrade.aoe_radius_mod;
        });

        let projectile = new Projectile({x: target_x, y: target_y}, new AOEMagicBall(actual_damage, actual_radius));

        projectiles.push(projectile);

        return projectiles;
    }
}