export class Defender{
    public readonly model: DefenderModel;
    public readonly x: number;
    public readonly y: number;
    constructor(model: DefenderModel, x: number, y: number){
        this.x = x;
        this.y = y;
        this.model = model;
    }
}

export class DefenderModel{
    public damage: number = 0;
    public attack_speed: number = 0;
    public range: number = 0;
    public cost: number = 0;
    public name: string = "defender";
    public image: string = "url(assets/defenders/archer.png)";
    public description: string = "A basic defender."
    public constructor(damage: number, range: number, cost: number, attack_speed: number, name: string){
        this.damage = damage;
        this.range = range;
        this.cost = cost;
        this.name = name;
        this.attack_speed = attack_speed;
    }
}