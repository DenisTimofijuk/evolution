import { createCreature } from "../Generate Elements";
import type Layer from "../Layer";
import type Eat from "./Eat";
import type Move from "./Move";

export default class Multiply implements Trait{
    constructor(public name: TraitName, public self: LayerElement) {
        
    }
    
    
    update(layers: Map<LayerName, Layer>): void {
        const eatTrait = this.self.traits.get('eat') as Eat | undefined;
        if(eatTrait !== undefined && eatTrait.fedUp){
            this.self.childrens.push(this.clone);
        }
    }

    get clone(){
        const newCreature = createCreature();
        newCreature.pos.x = this.self.pos.x;
        newCreature.pos.y = this.self.pos.y;
        (newCreature.traits.get('move') as Move).velocity = (this.self.traits.get('move') as Move).velocity;
        (newCreature.traits.get('move') as Move).direction = (this.self.traits.get('move') as Move).direction;
        (newCreature.traits.get('move') as Move).steps = (this.self.traits.get('move') as Move).steps;

        return newCreature
    }
}