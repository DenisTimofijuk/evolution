import type Layer from "src/Layer";

export default class Eaten implements Trait {
    constructor(public name: TraitName, public self: LayerElement) {
        
    }
    
    update(layers: Map<LayerName, Layer>): void {
        const creature = layers.get('creatures')?.matrix.get(Math.round(this.self.pos.x), Math.round(this.self.pos.y));
        if(creature){
            this.self.alive = false;
        }
    }
}