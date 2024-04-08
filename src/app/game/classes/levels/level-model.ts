import { Attacker } from "../attackers/attacker";
import { HitboxMap } from "../hitboxmap";

export abstract class LevelModel{
    public hitboxmap: HitboxMap = new HitboxMap();
    public abstract background : string;
    public abstract readonly difficulty : Difficulty;
    public abstract readonly name : string;
    public totalRounds: number = 15;
    public abstract spawnInterval: number;
    public get Width() { return this.hitboxmap.hitboxes[0].length; }
    public get Height() { return this.hitboxmap.hitboxes.length; }
    protected SpawnPoints: {x: number, y: number}[] = [];
    protected EndPoints: {x: number, y: number}[] = [];
    public Pathing: Map<number, {x: number, y: number}[]> = new Map<number, {x: number, y: number}[]>();
    protected abstract BuildHitboxMap(): void;
    public abstract GetRandomAttackers(): Attacker[];

    public GetRandomSpawnpoint(){
        return this.SpawnPoints[Math.floor(Math.random() * this.SpawnPoints.length)];
    }
    
    protected BuildPathing(): void {
        this.hitboxmap.hitboxes.forEach((row, y) => {
            let py = (y / this.hitboxmap.hitboxes.length + (1 / this.hitboxmap.hitboxes.length) / 2) * 100;
            row.forEach((cell, x) => {
                let px = (x / row.length + (1 / row.length) / 2) * 100;
                if(cell == 2){
                    this.SpawnPoints.push({x: px, y: py});
                }
                if(cell == 3){
                    this.EndPoints.push({x: px, y: py});
                }
            });
        });

        let visited: number[][] = Array.from({length: this.Height}, () => Array.from({length: this.Width}, () => -1));
        let queue: {x: number, y: number, steps: number}[] = [];
        this.SpawnPoints.forEach(spawn => {
            queue.push({x: Math.floor(spawn.x / 100 * this.Width), y: Math.floor(spawn.y / 100 * this.Height), steps: 1});
        });
        
        while(queue.length > 0){
            let current = queue.shift()!;
            let x = current.x;
            let y = current.y;
            let curr_steps = current.steps;
            if(visited[y][x] != -1){
                continue;
            }
            visited[y][x] = curr_steps;
            let cell = this.hitboxmap.hitboxes[y][x];
            if(cell == 0 || cell == 3){
                continue;
            }
            for(let dir of [[0,1],[1,0],[0,-1],[-1,0]]){
                let nx = x + dir[0];
                let ny = y + dir[1];
                if(nx < 0 || nx >= this.Width || ny < 0 || ny >= this.Height){
                    continue;
                }
                if(visited[ny][nx] != -1){
                    continue;
                }
                if(this.hitboxmap.hitboxes[ny][nx] == 0){
                    continue;
                }
                queue.push({x: nx, y: ny, steps: curr_steps + 1});
            }
        }
        
        let max_steps = 0;
        visited.forEach(row => {
            row.forEach(cell => {
                if(cell > max_steps){
                    max_steps = cell;
                }
            });
        });

        for(let i = 1; i <= max_steps; i++){
            this.Pathing.set(i, []);
        }

        visited.forEach((row, y) => {
            let py = (y / this.hitboxmap.hitboxes.length + (1 / this.hitboxmap.hitboxes.length) / 2) * 100;
            row.forEach((cell, x) => {
                let px = (x / row.length + (1 / row.length) / 2) * 100;
                if(cell != -1){
                    this.Pathing.get(cell)!.push({x: px, y: py});
                }
            });
        });

        console.log(this.Pathing);
    }
}

export enum Difficulty{
    EASY = 1,
    MEDIUM = 2,
    HARD = 3
}