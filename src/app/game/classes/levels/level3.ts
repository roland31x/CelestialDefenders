import { Level, Difficulty } from "./level";

export class Level3 extends Level {
    public background: string = "assets/level3.png";
    public override difficulty = 3;
    public override name = "Blizzard Mountain";
    constructor(){
        super();
        this.BuildHitboxMap();
    }

    protected BuildHitboxMap(){

    }
}