import type Creature from "src/creature/Creature";

export default class Move implements Trait{
    velocity: number;
    constructor(public name: TraitName) {
        this.velocity = 0;
    }

    update(self: Creature){
        this.go(self);
    }

    pause(){

    }

    go(self: Creature){
        const velocity = (self.traits.get('move') as Move).velocity;
        self.pos.x += velocity;
        // self.ctx?.translate(10, 0);
    }
}