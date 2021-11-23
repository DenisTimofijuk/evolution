import { Vec } from "./Vec";

export default class Creature {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    fillColor: string;
    lineColor: string;
    traits: Map<TraitName, Trait>;
    pos: Vec;
    constructor() {
        this.traits = new Map();
        this.pos = new Vec();
        this.lineColor = 'blue';
        this.fillColor = 'red';
        this.canvas = document.createElement('canvas');
        this.canvas.width = 16;
        this.canvas.height = 16;
        this.ctx = this.canvas.getContext('2d');

        this.createImage();
        // this.debugg();
    }

    private createImage(){    
        this.ctx?.beginPath();
        const x = this.canvas.width / 2;
        const y = this.canvas.height / 2;
        const r = this.canvas.width / 2 - 1;
        this.ctx!.strokeStyle = this.lineColor;
        this.ctx!.fillStyle = this.fillColor;
        this.ctx!.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx!.stroke();
        this.ctx!.fill();
        this.ctx?.closePath();
    }

    private debugg(){
        this.ctx!.beginPath();
        this.ctx!.strokeStyle = 'red';
        this.ctx!.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }

    refreshImage(){
        this.createImage();
    }

    addTrait(trait:Trait){
        this.traits.set(trait.name, trait);
    }
}