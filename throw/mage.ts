import { DefenderModel } from "../defender";
import { ExtraDamage } from "../defender-upgrades";
import { ExtraRange } from "../defender-upgrades";
import { ExtraAttackSpeed } from "../defender-upgrades";

export class MageModel extends DefenderModel{
    public constructor(){
        super(15, 8, 300, 0.75, "Mage");
        this.availableUpgrades = [new ExtraDamage(), new ExtraRange(), new ExtraAttackSpeed()];
        this.image = "url(assets/defenders/archer.png)";
        this.description = "Fires homing magic missiles towards enemies. Especially effective against fast moving enemies.";
    }
}