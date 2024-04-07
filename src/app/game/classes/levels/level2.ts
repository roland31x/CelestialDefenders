import { Level, Difficulty } from "./level";

export class Level2 extends Level {
    public background: string = "assets/level2.png";
    public override difficulty = 2;
    public override name = "Desert Dunes";
    constructor(){
        super();
        this.BuildHitboxMap();
    }

    protected BuildHitboxMap(){

    }
}