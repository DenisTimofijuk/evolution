import type Layer from "./Layer";

export default class Compositor {
    layers: Map<LayerName, Layer>;
    private outputCtx: CanvasRenderingContext2D;
    constructor(outputCanvas:HTMLCanvasElement) {
        this.outputCtx = outputCanvas.getContext('2d')!;
        this.layers = new Map();
    }

    addLayer(layer:Layer){
        this.layers.set(layer.name, layer);
    }

    compose(){
        this.layers.forEach(layer => {
            this.outputCtx.drawImage(layer.canvas, 0, 0);
        })
    }

    update(){
        this.layers.forEach(layer => {
            layer.updateTraits(this.layers);
            layer.updateMatrix();
            layer.removeDeadElements();
        })
    }
}