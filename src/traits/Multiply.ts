import { createCreature } from "../Generate Elements";
import type Layer from "../Layer";
import type Eat from "./Eat";
import type Move from "./Move";

export default class Multiply implements Trait{
    constructor(public name: TraitName, public self: LayerElement) {
        
    }
    
    
    update(layers: Map<LayerName, Layer>): void {
        const eatTrait = this.self.traits.get('eat') as Eat | undefined;
        if(eatTrait !== undefined && eatTrait.capacityFull){
            this.self.childrens.push(this.clone);
        }
    }

    get clone(){
        const newCreature = createCreature();
        newCreature.pos.x = this.self.pos.x-1;
        newCreature.pos.y = this.self.pos.y-1;
        const newCreatureMoveTrait = newCreature.traits.get('move') as Move | undefined;
        const currentMoveTrait = this.self.traits.get('move') as Move | undefined;

        newCreatureMoveTrait && currentMoveTrait && (newCreatureMoveTrait.velocity = currentMoveTrait.velocity);
        newCreatureMoveTrait && currentMoveTrait && (newCreatureMoveTrait.direction = currentMoveTrait.direction);
        newCreatureMoveTrait && currentMoveTrait && (newCreatureMoveTrait.steps = currentMoveTrait.steps);

        return newCreature
    }
}