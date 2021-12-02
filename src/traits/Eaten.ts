import type Layer from "src/Layer";

export default class Eaten implements Trait {
    constructor(public name: TraitName, public self: LayerElement) {
        
    }
    
    update(layers: Map<LayerName, Layer>): void {
        
    }
}