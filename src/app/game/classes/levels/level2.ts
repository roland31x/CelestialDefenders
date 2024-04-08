import { Attacker } from "../attackers/attacker";
import { LevelModel, Difficulty } from "./level-model";

export class Level2 extends LevelModel {
    public background: string = "assets/level2.png";
    public override difficulty = Difficulty.MEDIUM;
    public override name = "Desert Dunes";
    public override spawnInterval: number = 500;
    constructor(){
        super();
        this.BuildHitboxMap();
    }

    public override GetRandomAttackers(): Attacker[] {
        return [];
    }

    protected BuildHitboxMap(){

    }
}