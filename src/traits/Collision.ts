import type Creature from "src/creature/Creature";
import type Move from "./Move";

export default class Collision implements Trait {
    canvas: HTMLCanvasElement;
    constructor(public name: TraitName, public self: Creature) {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    }

    update(){
        if(this.self.pos.x > (this.canvas.width - this.self.size)){
            this.self.pos.x = this.canvas.width - this.self.size;
        }else if(this.self.pos.x < 0){
            this.self.pos.x = 0;
        }

        if(this.self.pos.y > (this.canvas.height - this.self.size) ){
            this.self.pos.y = this.canvas.height - this.self.size;
        } else if(this.self.pos.y < 0 ){
            this.self.pos.y = 0;
        }
    }
}