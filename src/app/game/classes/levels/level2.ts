import { Attacker } from "../attackers/attacker";
import { LevelModel, Difficulty } from "./level-model";
import { SpawnMap } from "./spawn-map";

export class Level2 extends LevelModel {
    public background: string = "assets/level2.png";
    public override difficulty = Difficulty.MEDIUM;
    public override name = "Desert Dunes";

    constructor(){
        super();
        this.BuildHitboxMap();
    }

    public override GetSpawns(): SpawnMap {
        return new SpawnMap();
    }

    protected BuildHitboxMap(){

    }
}