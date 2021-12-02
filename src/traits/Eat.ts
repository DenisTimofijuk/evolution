import type Layer from "src/Layer";
import type Creature from "src/world elements/Creature";

export default class Eat implements Trait{
    constructor(public name: TraitName, public self: Creature) {
        
    }
    
    update(layers: Map<LayerName, Layer>): void {
        const food = layers.get('food')?.matrix.get(Math.round(this.self.pos.x), Math.round(this.self.pos.y));
        if(food?.alive){
            this.self.lifeTime += 10;
            // console.log(this.self.lifeTime)
        }
    }
}