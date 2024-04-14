import { Attacker } from "./attacker";

export class GoblinBasic extends Attacker{
    public override readonly image;
    public override readonly zindex = 10;
    public constructor(){
        super(15, 0.13);
        let random = Math.floor(Math.random() * 3) + 1;
        this.image = `url(assets/attackers/goblins/goblin-${random}.png)`
    }
}

export class GoblinHeavy extends Attacker{
    public override readonly image;
    public override readonly zindex = 20;
    public override readonly scale = 1.25;
    public constructor(){
        super(45, 0.09);
        let random = Math.floor(Math.random() * 2) + 1;
        this.image = `url(assets/attackers/goblins/goblin-heavy-${random}.png)`
    }
}

export class GoblinBoss extends Attacker{
    public override readonly image;
    public override readonly scale = 2;
    public override readonly zindex = 25;
    public constructor(){
        super(125, 0.05);
        this.image = `url(assets/attackers/goblins/goblin-boss.png)`
    }
}

export class GoblinSuperHeavy extends Attacker{
    public override readonly image;
    public override readonly scale = 2;
    public override readonly zindex = 30;
    public constructor(){
        super(250, 0.05);
        this.image = `url(assets/attackers/goblins/goblin-super-heavy.png)`
    }
}

export class GoblinLight extends Attacker{
    public override readonly image;
    public override readonly zindex = 5;
    public constructor(){
        super(10, 0.25);
        this.image = `url(assets/attackers/goblins/goblin-light.png)`
    }
}

export class GoblinGuard extends Attacker{
    public override readonly image;
    public override readonly zindex = 15;
    public constructor(){
        super(10, 0.05);
        this.image = `url(assets/attackers/goblins/goblin-heavy-1.png)`
    }
}