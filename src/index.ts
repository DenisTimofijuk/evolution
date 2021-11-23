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

const creature = new Creature();
creature.pos.set(60, 60);
creature.addTrait(new Move('move'));
(creature.traits.get('move') as Move).velocity = 0.2;


function start(){
    creature.traits.forEach(trait => trait.update(creature));
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx?.drawImage(creature.canvas, creature.pos.x, creature.pos.y);

    requestAnimationFrame(start)
}

start()