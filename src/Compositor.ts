import type Layer from "./Layer";

export default class Compositor {
    layers: Map<LayerName, Layer>;
    private outputCtx: CanvasRenderingContext2D;
    tasks: Function[];
    constructor(outputCanvas:HTMLCanvasElement) {
        this.outputCtx = outputCanvas.getContext('2d')!;
        this.layers = new Map();
        this.tasks = [];
    }

    addLayer(layer:Layer){
        this.layers.set(layer.name, layer);
    }

    compose(){
        this.layers.get('background')?.fillAll();
        this.layers.forEach(layer => {
            this.outputCtx.drawImage(layer.canvas, 0, 0);
        })
    }

    update(){
        this.updateAll();
        this.additionalUpdates();
    }

    private updateAll(){
        this.layers.forEach(layer => {
            layer.updateTraits(this.layers);
            layer.updateMatrix();
            layer.removeDeadElements();
            layer.releaseChildrensInToTheWorld();
        })
    }

    private additionalUpdates(){
        this.layers.get('creatures')?.clear();
        this.layers.get('creatures')?.drawAll();
        this.layers.get('food')?.clear();
        this.layers.get('food')?.drawAll();
    }

    taskManager(){
        this.tasks.forEach(task => task());
        this.tasks = [];
    }
}