import { HitboxMap } from "../hitboxmap";

export abstract class Level{
    public hitboxmap: HitboxMap = new HitboxMap();
    public abstract background : string;
    public abstract readonly difficulty : Difficulty;
    public abstract readonly name : string;
    protected abstract BuildHitboxMap(): void;
}





export enum Difficulty{
    EASY = 1,
    MEDIUM = 2,
    HARD = 3
}