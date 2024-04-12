import { Attacker } from "./attacker";

export class BasicAttacker extends Attacker{
    public override readonly image = "url(assets/attackers/basic.png)";
    public override readonly zindex = 10;
    public constructor(){
        super(15, 0.16);
    }
}

export class FastAttacker extends Attacker{
    public override readonly image = "url(assets/attackers/fast.png)";
    public override readonly zindex = 5;
    public constructor(){
        super(5, 0.4);
    }
}

export class HeavyAttacker extends Attacker{
    public override readonly image = "url(assets/attackers/heavy.png)";
    public override readonly zindex = 20;
    public constructor(){
        super(30, 0.11);
    }
}

export class Boss extends Attacker{
    public override readonly image = "url(assets/attackers/boss.png)";
    public override readonly scale = 1.5;
    public override readonly zindex = 25;
    public constructor(){
        super(100, 0.05);
    }
}

export class Guard extends Attacker{
    public override readonly image = "url(assets/attackers/guard.png)";
    public override readonly scale = 0.9;
    public override readonly zindex = 24;
    public constructor(){
        super(5, 0.05);
    }
}