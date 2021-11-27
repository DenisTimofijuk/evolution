import { Vec } from "../vaHelpers/Vec";

export default class Creature {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    fillColor: string;
    traits: Map<TraitName, Trait>;
    pos: Vec;
    size: number;
    lifeTime: number;
    alive: boolean;
    constructor() {
        this.traits = new Map();
        this.pos = new Vec();
        this.fillColor = 'grey';
        this.canvas = document.createElement('canvas');
        this.size = 1;
        this.lifeTime = 300;
        this.alive = true;
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.ctx = this.canvas.getContext('2d', {alpha: false})!;

        this.createImage();
    }

    private createImage() {
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.beginPath();
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        this.ctx.closePath();
    }

    addTrait(trait: Trait) {
        this.traits.set(trait.name, trait);
    }
}