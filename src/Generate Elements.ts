import Creature from "./world elements/Creature";
import Aging from "./traits/Aging";
import Collision from "./traits/Collision";
import Move from "./traits/Move";
import { randomIntFromInterval } from "./va functions/functions";
import Food from "./world elements/Food";
import Eat from "./traits/Eat";
import Multiply from "./traits/Multiply";
import ManualMoov from "./traits/debugg";
import Vision from "./traits/Vision";

type WorldOptions = {
    totalCount: number;
    startingPoint_x: number;
    startingPoint_y:number;
    worldWidth: number;
    worldHeight: number;
}

export function generateCreaturesOnWorld(o:WorldOptions) {
    const creaturesArray: Creature[] = [];
    while (creaturesArray.length < o.totalCount) {
        const creature = createCreature();
        creature.pos.set(randomIntFromInterval(o.startingPoint_x, o.worldWidth), randomIntFromInterval(o.startingPoint_y, o.worldHeight));

        creaturesArray.push(creature);
    }

    return creaturesArray;
}


export function generateFoodOnWorld(o:WorldOptions) {
    const foodArray: Food[] = [];
    while (foodArray.length < o.totalCount) {
        const food = createFood();
        food.pos.set(randomIntFromInterval(o.startingPoint_x, o.worldWidth), randomIntFromInterval(o.startingPoint_y, o.worldHeight));

        foodArray.push(food);
    }

    return foodArray;
}

export function createCreature() {
    const creature = new Creature();
    creature.addTrait(new Vision('vision', creature));
    creature.addTrait(new Move('move', creature));
    creature.addTrait(new Collision('collide', creature));
    creature.addTrait(new Aging('aging', creature));
    creature.addTrait(new Eat('eat', creature));
    creature.addTrait(new Multiply('multiply', creature));
    // creature.addTrait(new ManualMoov('manualmoov', creature));

    return creature;
}

export  function createFood() {
    const food = new Food();

    return food;
}