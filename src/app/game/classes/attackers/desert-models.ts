import { Attacker } from "./attacker";

export class DesertBasic extends Attacker{
    public override readonly image;
    public override readonly zindex = 10;
    public constructor(){
        super(20, 0.15);
        let random = Math.floor(Math.random() * 3) + 1;
        this.image = `url(assets/attackers/desert/basic-${random}.png)`
    }
}

export class DesertScout extends Attacker{
    public override readonly image;
    public override readonly zindex = 5;
    public constructor(){
        super(5, 0.40);
        let random = Math.floor(Math.random() * 2) + 1;
        this.image = `url(assets/attackers/desert/scout-${random}.png)`
    }
}

export class DesertHeavy extends Attacker{
    public override readonly image = "url(assets/attackers/desert/heavy.png)";
    public override readonly scale = 1.25;
    public override readonly zindex = 20;
    public constructor(){
        super(65, 0.10);
    }
}

export class DesertBoss extends Attacker{
    public override readonly image = "url(assets/attackers/desert/boss-1.png)";
    public override readonly scale = 2;
    public override readonly zindex = 25;
    public constructor(){
        super(200, 0.05);
    }
}

export class DesertChieftain extends Attacker{
    public override readonly image = "url(assets/attackers/desert/boss-2.png)";
    public override readonly scale = 2.25;
    public override readonly zindex = 30;
    public constructor(){
        super(300, 0.04);
    }

}

export class DesertGuard extends Attacker{
    public override readonly image = "url(assets/attackers/desert/guard.png)";
    public override readonly scale = 0.9;
    public override readonly zindex = 24;
    public constructor(){
        super(5, 0.05);
    }
}