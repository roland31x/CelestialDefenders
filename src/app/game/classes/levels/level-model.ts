import { HitboxMap } from "../hitboxmap";

export abstract class LevelModel{
    public hitboxmap: HitboxMap = new HitboxMap();
    public abstract background : string;
    public abstract readonly difficulty : Difficulty;
    public abstract readonly name : string;
    public totalRounds: number = 15;
    public get Width() { return this.hitboxmap.hitboxes[0].length; }
    public get Height() { return this.hitboxmap.hitboxes.length; }
    protected abstract BuildHitboxMap(): void;
}

export enum Difficulty{
    EASY = 1,
    MEDIUM = 2,
    HARD = 3
}