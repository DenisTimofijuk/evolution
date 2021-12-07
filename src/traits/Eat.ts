import type Layer from "src/Layer";
import type Creature from "src/world elements/Creature";

export default class Eat implements Trait{
    capacityFull: boolean;
    private capacity: number;
    constructor(public name: TraitName, public self: Creature) {
        this.capacityFull = false;
        this.capacity = 0;
    }
    
    update(layers: Map<LayerName, Layer>): void {
        const food = layers.get('food')?.matrix.get(Math.round(this.self.pos.x), Math.round(this.self.pos.y));
        
        if(this.self.alive && food?.alive){
            this.self.lifeTime += 10;
            this.capacity++;   
            food.remove();
        }

        if(this.capacity >=2){
            this.capacityFull = true;
            this.capacity = 0;
        }else{
            this.capacityFull = false;
        }
    }
}