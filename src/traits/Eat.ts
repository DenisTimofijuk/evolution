import type Creature from "src/world elements/Creature";

export default class Eat implements Trait{
    constructor(public name: TraitName, public self: Creature) {
        
    }
    
    update(): void {
        // if creature is inside food place
        //      this.self.lifeTime += 300;
    }
}