import type Layer from "src/Layer";
import type Matrix from "src/Matrix";
import type Food from "src/world elements/Food";

export default class Vision implements Trait {
    visibleDistance: number;
    visibleFood: Food | undefined;
    constructor(public name: TraitName, public self: LayerElement) {
        this.visibleDistance = 2;
        this.visibleFood = undefined;
    }

    update(layers: Map<LayerName, Layer>): void {
        const foodLayer = layers.get('food');
        this.lookForFood(foodLayer?.matrix);

       
    }

    lookForFood(matrix?: Matrix) {
        if (!matrix) {
            return;
        }

        if(this.visibleFood?.alive){
            return;
        }

        this.visibleFood = undefined;

        const start_X = Math.round( Math.max(this.self.pos.x - this.visibleDistance, 0) );
        const start_Y = Math.round( Math.max(this.self.pos.y - this.visibleDistance, 0) );
        const end_X = Math.round( Math.min(this.self.pos.x + this.visibleDistance, 128) );
        const end_Y = Math.round( Math.min(this.self.pos.y + this.visibleDistance, 96) );

        for (let x = start_X; x <= end_X; x++) {
            for (let y = start_Y; y <= end_Y; y++) {
                if(x === this.self.pos.x && y === this.self.pos.y) continue;
                const iSeeFood = matrix.get(x, y);
                if( iSeeFood ){
                    this.visibleFood = iSeeFood as Food;
                    return;
                }
            }
        }
    }
}

// TODO: handle Math.round in global scope