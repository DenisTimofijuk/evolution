
import { displaySimulationYears, displayTotalCreatures } from './va functions/functions';
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


generateCreaturesOnWorld(1000, canvas.width, canvas.height).forEach(element => creatureLayer.addElement(element));
generateFoodOnWorld(1000, canvas.width-3, canvas.height-3).forEach(element => foodLayer.addElement(element));

foodLayer.draw();

let TOTAL_LIFE_TIME = 0;

const updateCurrentYears = displaySimulationYears();
const updateTotalCreatures = displayTotalCreatures();


runSimulator();


function runSimulator(){
    TOTAL_LIFE_TIME++;

    compositor.update();
    
    creatureLayer.clear();
    creatureLayer.draw();  
    foodLayer.clear();
    foodLayer.draw();

    backgroundLayer.fillAll();
    compositor.compose();
    
    updateCurrentYears(TOTAL_LIFE_TIME);
    updateTotalCreatures(creatureLayer.elements!.length);

    if(creatureLayer.elements!.length > 0){
        requestAnimationFrame(runSimulator);
    }else{
        compositor.layers.forEach(layer => console.log(layer.name, layer.matrix))
    }
}