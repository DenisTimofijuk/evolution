import type Creature from "src/creature/Creature";

export default class Move implements Trait{
    velocity: number;
    private radians: number;
    startingPos_y: number;
    startingPos_x: number;
    radio: number;
    constructor(public name: TraitName, public self: Creature) {
        this.velocity = 0;
        this.radians = 0;
        this.startingPos_x = self.pos.x
        this.startingPos_y = self.pos.y
        this.radio = randomIntFromInterval(1, 200);
    }

    update(){
        this.radians += this.velocity;
        this.self.pos.x = this.startingPos_x + Math.cos(this.radians)*this.radio;
        this.self.pos.y = this.startingPos_y + Math.sin(this.radians)*this.radio;
    }

    pause(){

    }

    go(){
        // const velocity = (self.traits.get('move') as Move).velocity;
        // self.pos.x += velocity;
    }
}


function randomIntFromInterval(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


/**
 * neuronas vaiksciot ratais
 * neuronas vaiksciot tiesiai
 * neuronas vaiksciot atgal
 * neuronas random vaiksciojimui (suma ratais tiesiai ir atgal)
 */

/**
 * randome judesys:
	1. nusprest i kuria puse nori eit [R-PR-ŠR-P-PR-PV-V-PV-ŠV-Š-ŠV-ŠR];
	2. nusprest kiek zingsniu nori nueit 
		2.a [Š-P-R-V] po viena gali eiti zingsni _ ar |
		2.b [PR-ŠR-PV-ŠV] eiti p du zingsnius _|
 */