import { DefenderModel } from "../defender";
import { ExtraDamage } from "../defender-upgrades";
import { ExtraRange } from "../defender-upgrades";
import { ExtraAttackSpeed } from "../defender-upgrades";

export class FreezerModel extends DefenderModel{
    public constructor(){
        super(0, 5, 400, 0.5, "Freezer");
        this.availableUpgrades = [new ExtraRange(), new ExtraAttackSpeed()];
        this.image = "url(assets/defenders/archer.png)";
        this.description = "Freezes enemies with a homing magic shot for a few seconds. Doesn't deal any damage.";
    }
}