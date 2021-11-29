export default class Layer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    elements?: LayerElements[];
    constructor(public name:string, width:number, height:number) {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d')!;
        this.ctx.imageSmoothingEnabled = false;
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    fillAll(){
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setElements(elements:LayerElements[]){
        this.elements = elements;
    }

    updateTraits(){
        this.elements?.forEach(element => element.traits.forEach(trait => trait.update()));
    }

    removeDeadElements(){
        this.elements = this.elements?.filter(element => element.alive);
    }

    draw(){
        this.elements?.forEach(element => {
            this.ctx.drawImage(element.canvas, Math.round(element.pos.x), Math.round(element.pos.y))
        })
    }
}