import Creature from './creature/Creature';
import { randomIntFromInterval } from './vaHelpers/functions';
import Move from './traits/Move';
import Collision from './traits/Collision';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d', {alpha: false})!;
ctx.imageSmoothingEnabled = false;

let creatures:Creature[] = [];

let TOTAL_LIFE_TIME = 0;

const updateCurrentYears = displaySimulationYears();
const updateTotalCreatures = displayTotalCreatures();

generateCreatures(50);
runSimulator();


function generateCreatures(total:number) {
    while(creatures.length < total){
        const creature = new Creature();
        creature.pos.set(randomIntFromInterval(0, canvas.width), randomIntFromInterval(0, canvas.width));
        creature.addTrait(new Move('move', creature));
        creature.addTrait(new Collision('collide', creature));
        (creature.traits.get('move') as Move).velocity = randomIntFromInterval(1, 200)/1000;
        creature.lifeTime = randomIntFromInterval(200, 1000);
        
        creatures.push(creature);
    }
}

function runSimulator(){
    TOTAL_LIFE_TIME++;

    creatures.forEach(creature => creature.traits.forEach(trait => trait.update()));
    
    creatures.forEach(creature => {
        creature.lifeTime--;
        if(creature.lifeTime <= 0){
            creature.alive = false;
        }
    });

    creatures = creatures.filter( creature => creature.alive );

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    creatures.forEach(creature => {
        ctx.drawImage(creature.canvas, Math.round(creature.pos.x), Math.round(creature.pos.y));
    });   
    
    updateCurrentYears(TOTAL_LIFE_TIME);
    updateTotalCreatures(creatures.length);

    if(creatures.length > 0){
        requestAnimationFrame(runSimulator);
    }
}

function displaySimulationYears() {
    const output = document.getElementById('genNumber')!;
    
    return function update(currentCycle:number) {
        const generation = Math.ceil(currentCycle / 200);
        output.innerText = generation.toString();    
    }
}

function displayTotalCreatures() {
    const output = document.getElementById('totCreatures')!;
    
    return function update(total:number) {
        output.innerText = total.toString();    
    }
}