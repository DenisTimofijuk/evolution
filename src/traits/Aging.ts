import type Creature from "src/world elements/Creature";

export default class Aging implements Trait{
    constructor(public name: TraitName,  public self: Creature) {
        
    }
    update(): void {
        this.self.lifeTime--;
        if(this.self.lifeTime <= 0){
            this.self.alive = false;
        }
    }
}


