export class HitboxMap{
    public hitboxes: number[][] = Array.from({length: 32}, () => Array.from({length: 32}, () => 0));
}