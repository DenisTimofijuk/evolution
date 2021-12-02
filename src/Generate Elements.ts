import Creature from "./world elements/Creature";
import Aging from "./traits/Aging";
import Collision from "./traits/Collision";
import Move from "./traits/Move";
import { randomIntFromInterval } from "./va functions/functions";
import Food from "./world elements/Food";
import Eat from "./traits/Eat";
import Eaten from "./traits/Eaten";
import Multiply from "./traits/Multiply";

export function generateCreaturesOnWorld(total: number, worldWidth: number, worldHeight: number) {
    const creaturesArray: Creature[] = [];
    while (creaturesArray.length < total) {
        const creature = createCreature();
        creature.pos.set(randomIntFromInterval(0, worldWidth), randomIntFromInterval(0, worldHeight));
        (creature.traits.get('move') as Move).velocity = randomIntFromInterval(1, 200) / 1000;

        creaturesArray.push(creature);
    }

    return creaturesArray;
}


export function generateFoodOnWorld(total: number, worldWidth: number, worldHeight: number) {
    const foodArray: Food[] = [];
    while (foodArray.length < total) {
        const food = createFood();
        food.pos.set(randomIntFromInterval(50, worldWidth), randomIntFromInterval(0, worldHeight));

        foodArray.push(food);
    }

    return foodArray;
}

export function createCreature() {
    const creature = new Creature();
    creature.addTrait(new Move('move', creature));
    creature.addTrait(new Collision('collide', creature));
    creature.addTrait(new Aging('aging', creature));
    creature.addTrait(new Eat('eat', creature));
    creature.addTrait(new Multiply('multiply', creature));

    return creature;
}

function createFood() {
    const food = new Food();
    food.addTrait(new Eaten('eaten', food));

    return food;
}