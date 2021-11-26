import { Vec } from "../vaHelpers/Vec";

export default class Creature {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    fillColor: string;
    lineColor: string;
    traits: Map<TraitName, Trait>;
    pos: Vec;
    size: number;
    constructor() {
        this.traits = new Map();
        this.pos = new Vec();
        this.lineColor = 'blue';
        this.fillColor = 'grey';
        this.canvas = document.createElement('canvas');
        this.size = 10;
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.ctx! = this.canvas.getContext('2d')!;

        this.createImage();
    }

    private createImage() {
        this.ctx?.beginPath();
        const x = this.canvas.width / 2;
        const y = this.canvas.height / 2;
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.fillStyle = this.fillColor;
        this.ctx.arc(this.size/2, this.size/2, this.size/2-1, 0, 2*Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    refreshImage() {
        this.createImage();
    }

    addTrait(trait: Trait) {
        this.traits.set(trait.name, trait);
    }
}