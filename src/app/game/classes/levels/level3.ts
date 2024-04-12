import { Attacker } from "../attackers/attacker";
import { LevelModel, Difficulty } from "./level-model";
import { SpawnMap } from "./spawn-map";

export class Level3 extends LevelModel {
    public background: string = "assets/level3.png";
    public override difficulty = Difficulty.HARD;
    public override name = "Blizzard Mountain";
    public override spawnInterval: number = 330;
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