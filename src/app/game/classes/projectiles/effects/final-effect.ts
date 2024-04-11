import { DamageArea } from "./effect-enums";
import { Effect } from "./effect-base";

export class FinalEffect{
    public readonly area: DamageArea;
    public readonly radius: number = 0;
    public readonly effects: Effect[] = [];
    
    public constructor(area: DamageArea, radius?: number, effects? : Effect[]){
        if(effects){
            this.effects = effects;
        }
        if(radius){
            this.radius = radius;
        }
        this.area = area;
    }
}
