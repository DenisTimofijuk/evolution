import Creature from "./world elements/Creature";
import Aging from "./traits/Aging";
import Move from "./traits/Move";
import { randomIntFromInterval } from "./va functions/functions";
import Food from "./world elements/Food";
import Eat from "./traits/Eat";
import Multiply from "./traits/Multiply";
import ManualMoov from "./traits/debugg";
import Vision from "./traits/Vision";
import SexZone from "./world elements/SexZone";

type WorldOptions = {
    totalCount: number;
    startingPoint_x: number;
    startingPoint_y:number;
    worldWidth: number;
    worldHeight: number;
}

type SexZoneOptions = [
    {
        x:number;
        y:number;
        width:number;
        height:number;
    }
]

export function generateSexZone(o:SexZoneOptions) {
    const sexZones:SexZone[] = [];
    o.forEach(zoneSettings => {
        const zone = new SexZone(zoneSettings.width, zoneSettings.height);
        zone.pos.x = zoneSettings.x;
        zone.pos.y = zoneSettings.y;

        sexZones.push(zone);
    });

    return sexZones;
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
    // creature.addTrait(new ManualMoov('manualmoov', creature));
    creature.addTrait(new Move('move', creature));
    creature.addTrait(new Aging('aging', creature));
    creature.addTrait(new Eat('eat', creature));
    creature.addTrait(new Multiply('multiply', creature));
    

    return creature;
}

export  function createFood() {
    const food = new Food();

    return food;
}