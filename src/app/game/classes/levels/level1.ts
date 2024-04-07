import { Level, Difficulty } from "./level";

export class Level1 extends Level {
    public background: string = "assets/level1.png";
    public override difficulty = 1;
    public override name = "Green Hills";
    constructor(){
        super();
        this.BuildHitboxMap();
    }

    protected BuildHitboxMap(){

    }
}