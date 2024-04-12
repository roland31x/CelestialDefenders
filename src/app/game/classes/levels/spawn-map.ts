import { Attacker } from "../attackers/attacker";

export class SpawnMap {
    public readonly spawns: Map<number, RoundMap> = new Map<number, RoundMap>();
}

export class RoundMap {
    public readonly spawns: Spawn[] = [];
    constructor(spawns: Spawn[]){
        this.spawns = spawns;
    }
}

export class Spawn {
    public readonly attacker: Attacker;
    public readonly delay: number;
    public constructor(attacker: Attacker, delay: number){
        this.attacker = attacker;
        this.delay = delay;
    }
}