import Matrix from "./Matrix";
import type Move from "./traits/Move";

export default class Layer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    elements: LayerElement[];
    matrix: Matrix;
    constructor(public name: LayerName, width: number, height: number) {
        this.elements = [];
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d')!;
        this.ctx.imageSmoothingEnabled = false;
        this.matrix = new Matrix();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    fillAll() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addElement(element: LayerElement) {
        this.elements.push(element);
        this.matrix.set(Math.round(element.pos.x), Math.round(element.pos.y), element);
    }

    updateTraits(layers: Map<LayerName, Layer>) {
        this.elements?.forEach(element => element.traits.forEach(trait => {
            trait.update(layers);
            this.updateMatrix(element);
        }));
    }

    removeDeadElements() {
        const aliveElements: LayerElement[] = []
        for (let element of this.elements) {
            if (element.alive) {
                aliveElements.push(element);
            } else {
                this.matrix.delete(Math.round(element.pos.x), Math.round(element.pos.y))
            }
        }
        this.elements = aliveElements;       
    }

    drawAll() {
        this.elements?.forEach(element => {
            this.ctx.drawImage(element.canvas, Math.round(element.pos.x), Math.round(element.pos.y))
        })
    }

    updateMatrix(element: LayerElement) {
        const moveTrait = element.traits.get('move') as Move | undefined;
        if (moveTrait && moveTrait.stespHistory.length == 2) {
            const oldPosition = moveTrait.stespHistory[0];
            const newPosition = moveTrait.stespHistory[1];
            this.matrix.delete(Math.round(oldPosition.x), Math.round(oldPosition.y));
            if (element.alive) {
                this.matrix.set(Math.round(newPosition.x), Math.round(newPosition.y), element);
            }
        }
    }

    releaseChildrensInToTheWorld() {
        this.elements.filter(element => element.childrens.length > 0).forEach(elementWithChildrens => {
            elementWithChildrens.childrens.forEach(child => this.addElement(child));
            elementWithChildrens.childrens = [];
        })
    }
}