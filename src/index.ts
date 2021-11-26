/**
 * 1. Self-replication
 * 2. Blueprint
 * 3. Inherit blueprint
 * 4. Mutation
 * 5. Selection
 */


import Creature from './creature/Creature';
import { randomIntFromInterval } from './vaHelpers/functions';
import Move from './traits/Move';
import Collision from './traits/Collision';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const creatures:Creature[] = [];

while(creatures.length < 50){
    const creature = new Creature();
    creature.pos.set(randomIntFromInterval(0, canvas.width), randomIntFromInterval(0, canvas.width));
    creature.addTrait(new Move('move', creature));
    creature.addTrait(new Collision('collide', creature));
    (creature.traits.get('move') as Move).velocity = randomIntFromInterval(1, 200)/100;
    
    creatures.push(creature);
}

function start(){
    creatures.forEach(creature => creature.traits.forEach(trait => trait.update()));
    // ctx!.fillStyle = 'rgba(255, 255, 255, 0.1)';
    // ctx?.fillRect(0, 0, canvas.width, canvas.height);
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    creatures.forEach(creature => {
        ctx?.drawImage(creature.canvas, creature.pos.x, creature.pos.y);
    });    

    requestAnimationFrame(start)
}

start()