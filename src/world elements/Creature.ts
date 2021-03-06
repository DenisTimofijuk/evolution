import { getuuidv4, randomIntFromInterval } from "../va functions/functions";
import { Vec } from "../va functions/Vec";

export default class Creature implements LayerElement {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    fillColor: string;
    traits: Map<TraitName, Trait>;
    pos: Vec;
    size: number;
    lifeTime: number;
    alive: boolean;
    childrens: LayerElement[];
    UUID: string;
    constructor() {
        this.UUID = '' + getuuidv4();
        this.childrens = [];
        this.traits = new Map();
        this.pos = new Vec();
        this.fillColor = 'grey';
        this.canvas = document.createElement('canvas');
        this.size = 1;
        this.lifeTime = randomIntFromInterval(200, 300);
        this.alive = true;
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.ctx = this.canvas.getContext('2d', {alpha: false})!;

        this.draw();
    }

    draw() {
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.beginPath();
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        this.ctx.closePath();
    }

    remove(){
        this.alive = false;
    };

    addTrait(trait: Trait) {
        this.traits.set(trait.name, trait);
    }
}