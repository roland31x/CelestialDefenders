import { Attacker } from "./attacker";

export class FrostBasic extends Attacker{
    public override readonly image;
    public override readonly zindex = 10;
    public constructor(){
        super(55, 0.16);
        let random = Math.floor(Math.random() * 3) + 1;
        this.image = `url(assets/attackers/frost/basic-${random}.png)`
    }
}

export class FrostScout extends Attacker{
    public override readonly image = `url(assets/attackers/frost/scout.png)`;
    public override readonly zindex = 5;
    public constructor(){
        super(25, 0.4);
    }
}

export class FrostHeavy extends Attacker{
    public override readonly image;
    public override readonly scale = 1.25;
    public override readonly zindex = 20;
    public constructor(){
        super(125, 0.11);
        let random = Math.floor(Math.random() * 2) + 1;
        this.image = `url(assets/attackers/frost/heavy-${random}.png)`
    }
}

export class FrostBoss extends Attacker{
    public override readonly image;
    public override readonly scale = 2;
    public override readonly zindex = 25;
    public constructor(){
        super(500, 0.05);
        let random = Math.floor(Math.random() * 2) + 1;
        this.image = `url(assets/attackers/frost/boss-${random}.png)`
    }
}

export class FrostGuard extends Attacker{
    public override readonly image = "url(assets/attackers/frost/guard.png)";
    public override readonly scale = 1.5;
    public override readonly zindex = 24;
    public constructor(){
        super(75, 0.05);
    }
}