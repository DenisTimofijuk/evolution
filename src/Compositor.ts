import type Layer from "./Layer";

export default class Compositor {
    layers: Layer[];
    private outputCtx: CanvasRenderingContext2D;
    constructor(outputCanvas:HTMLCanvasElement) {
        this.outputCtx = outputCanvas.getContext('2d')!;
        this.layers = [];
    }

    addLayer(layer:Layer){
        this.layers.push(layer);
    }

    compose(){
        this.layers.forEach(layer => {
            this.outputCtx.drawImage(layer.canvas, 0, 0);
        })
    }

    update(){
        this.layers.forEach(layer => {
            layer.updateTraits();
            layer.removeDeadElements();
        })
    }
}