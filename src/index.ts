
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


creatureLayer.setElements(generateCreaturesOnWorld(1000, canvas.width, canvas.height));
foodLayer.setElements(generateFoodOnWorld(100, canvas.width-3, canvas.height-3))
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

    backgroundLayer.fillAll();
    compositor.compose();
    
    updateCurrentYears(TOTAL_LIFE_TIME);
    updateTotalCreatures(creatureLayer.elements!.length);

    if(creatureLayer.elements!.length > 0){
        requestAnimationFrame(runSimulator);
    }
}

