import type Layer from "src/Layer";
import { createFood } from "../Generate Elements";
import type Creature from "../world elements/Creature";

export default class Aging implements Trait{
    constructor(public name: TraitName,  public self: Creature) {
        
    }

    update(layers: Map<LayerName, Layer>): void {
        this.self.lifeTime--;
        if(this.self.lifeTime <= 0){
            this.self.alive = false;
            layers.get('food')?.addElement(this.food);
        }
    }

    get food(){
        const newFood = createFood();
        newFood.pos.x = this.self.pos.x;
        newFood.pos.y = this.self.pos.y;

        return newFood
    }
}


