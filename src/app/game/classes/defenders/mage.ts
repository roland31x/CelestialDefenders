import { Attacker } from "../attackers/attacker";
import { Projectile } from "../projectiles/projectile";
import { MagicBall } from "../projectiles/projectile-model";
import { DefenderModel } from "./defender";
import { ExtraAttackSpeed, ExtraDamage, ExtraRange } from "./defender-upgrades";

export class MageModel extends DefenderModel{
    public override image = "url(assets/defenders/mage.png)";
    public constructor(){
        super(10, 8, 400, 0.75, "Mage");
        this.availableUpgrades = [new ExtraDamage(), new ExtraRange(), new ExtraAttackSpeed()];
        
        this.description = "Fires homing magic missiles towards enemies. Especially effective against fast moving enemies.";
    }

    public override GetProjectilesFiredAt(attackers: Attacker[]) : Projectile[]{
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

        let arrow = new MagicBall(this.damage);

        let fired_arrow = new Projectile(target, arrow);
        projectiles.push(fired_arrow);

        return projectiles;
    }
}