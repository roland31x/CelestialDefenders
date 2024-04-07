import { LevelModel, Difficulty } from "./level-model";

export class Level3 extends LevelModel {
    public background: string = "assets/level3.png";
    public override difficulty = Difficulty.HARD;
    public override name = "Blizzard Mountain";
    constructor(){
        super();
        this.BuildHitboxMap();
    }

    protected BuildHitboxMap(){

    }
}