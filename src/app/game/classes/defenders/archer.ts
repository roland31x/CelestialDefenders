import { Attacker } from "../attackers/attacker";
import { DefenderModel } from "./defender";
import { ExtraDamage } from "./defender-upgrades";
import { ExtraRange } from "./defender-upgrades";
import { ExtraAttackSpeed } from "./defender-upgrades";
import { Arrow } from "../projectiles/projectile-model";
import { Projectile } from "../projectiles/projectile";

export class ArcherModel extends DefenderModel{
    public override image = "url(assets/defenders/archer.png)";

    public constructor(){
        super(6, 6, 100, 1, "Archer");
        this.availableUpgrades = [new ExtraDamage(), new ExtraRange(), new ExtraAttackSpeed()];
        this.description = "A basic archer that targets the farthest progressed enemy";
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
        let target_x = target.x;
        let target_y = target.y;

        let arrow = new Arrow(this.damage);

        let fired_arrow = new Projectile({x: target_x, y: target_y}, arrow);
        projectiles.push(fired_arrow);


        return projectiles;
    }
}