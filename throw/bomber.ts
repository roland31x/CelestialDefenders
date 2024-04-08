import { DefenderModel } from "../defender";
import { ExtraDamage } from "../defender-upgrades";
import { ExtraRange } from "../defender-upgrades";
import { ExtraAttackSpeed } from "../defender-upgrades";

export class BomberModel extends DefenderModel{
    public constructor(){
        super(25, 4, 1000, 0.3, "Bomber");
        this.availableUpgrades = [new ExtraDamage(), new ExtraRange(), new ExtraAttackSpeed()];
        this.image = "url(assets/defenders/archer.png)";
        this.description = "Throws bombs that explode in a big area and deal massive damage.";
    }
}