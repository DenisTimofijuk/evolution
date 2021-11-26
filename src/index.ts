/**
 * 1. Self-replication
 * 2. Blueprint
 * 3. Inherit blueprint
 * 4. Mutation
 * 5. Selection
 */


import Creature from './creature/Creature';
import Move from './traits/Move';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const creatures:Creature[] = [];

while(creatures.length < 50){
    const creature = new Creature();
    creature.pos.set(randomIntFromInterval(200, canvas.width-200), randomIntFromInterval(200, canvas.width-200));
    creature.addTrait(new Move('move', creature));
    (creature.traits.get('move') as Move).velocity = randomIntFromInterval(1, 50)/100;
    
    creatures.push(creature);
}


function randomIntFromInterval(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function start(){
    creatures.forEach(creature => creature.traits.forEach(trait => trait.update()));
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    creatures.forEach(creature => {
        ctx?.drawImage(creature.canvas, creature.pos.x, creature.pos.y);
    });    

    requestAnimationFrame(start)
}

start()