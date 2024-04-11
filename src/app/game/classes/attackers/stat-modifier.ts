export class StatModifier{
    public readonly speed_mod: number = 0;

    public constructor(speed?: number){
        if(speed){
            this.speed_mod = speed;
        }

    }
}