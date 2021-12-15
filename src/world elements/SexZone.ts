import { Vec } from "../va functions/Vec";

export default class SexZone implements LayerElement {
    canvas: HTMLCanvasElement;
    traits: Map<TraitName, Trait>;
    childrens: LayerElement[];
    ctx: CanvasRenderingContext2D;
    alive: boolean;
    pos: { x: number; y: number; };
    constructor(width:number, height:number) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d', {alpha: false})!;
        this.traits = new Map();
        this.childrens = [];
        this.alive = true;
        this.pos = new Vec();

        this.draw();
    }
    addTrait(trait: Trait): void {
        console.error("Method not implemented.");
    }
    draw(): void {
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.beginPath();
        this.ctx.fillStyle = '#f291ef';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        this.ctx.closePath();
    }
    remove(): void {
        console.error("Method not implemented.");
    }
    
}