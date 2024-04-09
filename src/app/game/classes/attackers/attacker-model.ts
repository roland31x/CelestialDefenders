export abstract class AttackerModel{
    public health: number;
    public speed: number;
    public abstract image: string;
    public sizeScale = 1;
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

export class FastAttacker extends AttackerModel{
    public override image = "url(assets/attackers/fast.png)";

    public constructor(){
        super(5, 0.4);
    }
}

export class HeavyAttacker extends AttackerModel{
    public override image = "url(assets/attackers/heavy.png)";

    public constructor(){
        super(30, 0.11);
    }
}

export class Boss extends AttackerModel{
    public override image = "url(assets/attackers/boss.png)";
    public override sizeScale = 1.5;
    public constructor(){
        super(100, 0.05);
    }
}

export class Guard extends AttackerModel{
    public override image = "url(assets/attackers/guard.png)";
    public override sizeScale = 0.9;
    public constructor(){
        super(5, 0.05);
    }
}