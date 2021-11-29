import Creature from "./world elements/Creature";
import Aging from "./traits/Aging";
import Collision from "./traits/Collision";
import Move from "./traits/Move";
import { randomIntFromInterval } from "./va functions/functions";
import Food from "./world elements/Food";

export function generateCreaturesOnWorld(total:number, worldWidth:number, worldHeight:number) {
    const creaturesArray:Creature[] = [];
    while(creaturesArray.length < total){
        const creature = new Creature();
        creature.pos.set(randomIntFromInterval(0, worldWidth), randomIntFromInterval(0, worldHeight));
        creature.addTrait(new Move('move', creature));
        creature.addTrait(new Collision('collide', creature));
        creature.addTrait(new Aging('aging', creature));
        (creature.traits.get('move') as Move).velocity = randomIntFromInterval(1, 200)/1000;
        creature.lifeTime = randomIntFromInterval(200, 1000);
        
        creaturesArray.push(creature);
    }

    return creaturesArray;
}


export function generateFoodOnWorld(total:number, worldWidth:number, worldHeight:number) {
    const foodArray:Food[] = [];
    while(foodArray.length < total){
        const food = new Food();
        food.pos.set(randomIntFromInterval(0, worldWidth), randomIntFromInterval(0, worldHeight));
        
        foodArray.push(food);
    }

    return foodArray;
}