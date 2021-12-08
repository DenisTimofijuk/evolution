
import { displaySimulationYears, displayTotalCreatures, displayTotalFood, randomIntFromInterval } from './va functions/functions';
import { generateCreaturesOnWorld, generateFoodOnWorld } from './Generate Elements';
import Compositor from './Compositor';
import Layer from './Layer';


const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const compositor = new Compositor(canvas);
const backgroundLayer = new Layer('background', canvas.width, canvas.height);
const creatureLayer = new Layer('creatures', canvas.width, canvas.height);
const foodLayer = new Layer('food', canvas.width, canvas.height);


compositor.addLayer(backgroundLayer);
compositor.addLayer(foodLayer);
compositor.addLayer(creatureLayer);



generateCreaturesOnWorld({
    totalCount: 1000,
    startingPoint_x: 0,
    startingPoint_y:0,
    worldWidth: canvas.width,
    worldHeight: canvas.height
}).forEach(element => creatureLayer.addElement(element));

generateFoodOnWorld({
    totalCount: 1000,
    startingPoint_x: 0,
    startingPoint_y:0,
    worldWidth: canvas.width-3,
    worldHeight: canvas.height-3
}).forEach(element => foodLayer.addElement(element));

let TOTAL_LIFE_TIME = 0;

const updateCurrentYears = displaySimulationYears();
const updateTotalCreatures = displayTotalCreatures();
const updateFood = displayTotalFood();


runSimulator();

function runSimulator(){
    TOTAL_LIFE_TIME++;

    if(isSezonForFood(TOTAL_LIFE_TIME)){
        generateFoodOnWorld({
            totalCount: 5,
            startingPoint_x: 95,
            startingPoint_y:0,
            worldWidth: canvas.width-3,
            worldHeight: canvas.height-3
        }).forEach(element => foodLayer.addElement(element));
    }

    compositor.update();
    compositor.compose();
    
    updateCurrentYears(TOTAL_LIFE_TIME);
    updateTotalCreatures(creatureLayer.elements!.length);
    updateFood(foodLayer.elements!.length);

    if(creatureLayer.elements!.length > 0){
        requestAnimationFrame(runSimulator);
        // setTimeout(runSimulator, 5000);
    }else{
        compositor.layers.forEach(layer => console.log("[",layer.name,"] Matrix:", layer.matrix, "Elements:", layer.elements.length))
    }
}

function isSezonForFood(currentCycle:number) {
    return Math.round(Math.sin(currentCycle / 200)) === -1;
}