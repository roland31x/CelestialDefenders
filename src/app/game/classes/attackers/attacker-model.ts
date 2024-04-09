export abstract class AttackerModel{
    public health: number;
    public speed: number;
    public abstract image: string;
    public constructor(health: number, speed: number){
        this.health = health;
        this.speed = speed;
    }
}

export class BasicAttacker extends AttackerModel{
    public override image = "url(assets/attackers/basic.png)";

    public constructor(){
        super(15, 0.16);
    }
}