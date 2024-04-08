import { DefenderModel } from "../defender";
import { ExtraDamage } from "../defender-upgrades";
import { ExtraRange } from "../defender-upgrades";
import { ExtraAttackSpeed } from "../defender-upgrades";

export class VolleyArcherModel extends DefenderModel{
    public constructor(){
        super(20, 4, 200, 0.5, "Volley Archer");
        this.availableUpgrades = [new ExtraDamage(), new ExtraRange(), new ExtraAttackSpeed()];
        this.image = "url(assets/defenders/archer.png)";
        this.description = "Shoots a volley of arrows at the target that deals damage to all enemies in the area.";
    }
}