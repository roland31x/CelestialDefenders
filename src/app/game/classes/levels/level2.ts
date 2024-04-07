import { LevelModel, Difficulty } from "./level-model";

export class Level2 extends LevelModel {
    public background: string = "assets/level2.png";
    public override difficulty = Difficulty.MEDIUM;
    public override name = "Desert Dunes";
    constructor(){
        super();
        this.BuildHitboxMap();
    }

    protected BuildHitboxMap(){

    }
}