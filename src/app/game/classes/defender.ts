export class Defender{
    public x: number = 0;
    public y: number = 0;
    public damage: number = 0;
    public attack_speed: number = 0;
    public range: number = 0;
    public cost: number = 0;
    public name: string = "defender";
    public image: string = "assets/defender.png";
    public description: string = "A basic defender."
    public constructor(damage: number, range: number, cost: number, attack_speed: number, name: string){
        this.damage = damage;
        this.range = range;
        this.cost = cost;
        this.name = name;
        this.attack_speed = attack_speed;
    }

}