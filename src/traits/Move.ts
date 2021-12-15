import type Creature from "../world elements/Creature";
import { randomIntFromInterval } from "../va functions/functions";
import { Vec } from "../va functions/Vec";
import type Layer from "src/Layer";
import type Vision from "./Vision";
import type Food from "src/world elements/Food";
import type Matrix from "src/Matrix";

type StraightDirection = 'N' | 'S' | 'W' | 'E';
type DiagonalDirection = 'NE' | 'SE' | 'SW' | 'NW';
const AVAILABLEDIRECTIONS: (StraightDirection | DiagonalDirection)[] = ['N', 'S', 'W', 'E', 'NE', 'SE', 'SW', 'NW'];
const STEPS_TO_REMEMBER = 2;

export default class Move implements Trait {
    velocity: number;
    direction: (StraightDirection | DiagonalDirection);
    steps: number;
    stespHistory: Vec[];
    collisionHandler: Collition;
    constructor(public name: TraitName, public self: Creature) {
        this.collisionHandler = new Collition(self.size, self.UUID);
        this.velocity = randomIntFromInterval(1, 200) / 1000;
        this.steps = 0;
        this.direction = 'E';
        this.stespHistory = [];
    }

    update(layers: Map<LayerName, Layer>) {
        const visionTrait = this.self.traits.get('vision') as Vision;
        if (visionTrait.visibleFood) {
            this.goTowardsFood(visionTrait.visibleFood)
        } else if (this.steps >= 0) {
            this.walk();
        } else {
            this.chooseDirection();
            this.chooseAmountOfSteps();
        }
    }

    goTowardsFood(visibleFood: Food) {
        this.direction = this.findDirection(visibleFood.pos.x, visibleFood.pos.y) || this.direction;
        this.walk();
    }

    walk() {
        let x = this.self.pos.x;
        let y = this.self.pos.y;
        switch (this.direction) {
            case 'N':
                y = this.self.pos.y - this.velocity;
                break;
            case 'S':
                y = this.self.pos.y + this.velocity;
                break;
            case 'W':
                x = this.self.pos.x - this.velocity;
                break;
            case 'E':
                x = this.self.pos.x + this.velocity;
                break;
            case 'NE':
                y = this.self.pos.y - this.velocity;
                x = this.self.pos.x + this.velocity;
                break;
            case 'NW':
                y = this.self.pos.y - this.velocity;
                x = this.self.pos.x - this.velocity;
                break;
            case 'SE':
                y = this.self.pos.y + this.velocity;
                x = this.self.pos.x + this.velocity;
                break;
            case 'SW':
                y = this.self.pos.y + this.velocity;
                x = this.self.pos.x - this.velocity;
                break;
            default:
                console.log("default unhandled.", this.direction)
                break;
        }

        // const otherCreature = this.matrix?.get(Math.round(x), Math.round(y)) as Creature;
        // if( otherCreature !== undefined && otherCreature.UUID !== this.self.UUID && otherCreature.alive){
        //     x = this.self.pos.x;
        //     y = this.self.pos.y;
        // }

        this.collisionHandler.updateNewPos(x, y);

        this.self.pos.x = this.collisionHandler.x;
        this.self.pos.y = this.collisionHandler.y;

        this.steps--;
        this.recordHistory();
    }

    chooseDirection() {
        this.direction = AVAILABLEDIRECTIONS[randomIntFromInterval(0, AVAILABLEDIRECTIONS.length - 1)];
    }

    findDirection(target_X: number, target_Y: number): StraightDirection | undefined {
        if (Math.round(target_X) - Math.round(this.self.pos.x) < 0) return 'W';
        if (Math.round(target_X) - Math.round(this.self.pos.x) > 0) return 'E';
        if (Math.round(target_Y) - Math.round(this.self.pos.y) < 0) return 'N';
        if (Math.round(target_Y) - Math.round(this.self.pos.y) > 0) return 'S';
        else return;
    }

    chooseAmountOfSteps() {
        this.steps = randomIntFromInterval(0, 50);
    }

    recordHistory() {
        if (this.stespHistory.length > 0) {
            const previousPosition = this.stespHistory[0];
            if (previousPosition.x === this.self.pos.x && previousPosition.y === this.self.pos.y) {
                return;
            }
        }

        const pos = new Vec();
        pos.set(this.self.pos.x, this.self.pos.y);
        this.stespHistory.push(pos);
        if (this.stespHistory.length >= STEPS_TO_REMEMBER) {
            const sliceIndex = STEPS_TO_REMEMBER * (-1);
            this.stespHistory = this.stespHistory.slice(sliceIndex);
        }
    }
}

class Collition {
    private newPos: Vec;
    private canvas: HTMLCanvasElement;
    matrix?: Matrix;
    currentPos: Vec;
    constructor(private creatureSize:number, private creatureUUID:string) {
        this.newPos = new Vec();
        this.currentPos = new Vec();
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    }

    updateMatrix(currentMatrix:Matrix){
        this.matrix = currentMatrix;
    }

    updateNewPos(x:number, y:number){
        this.newPos.set(x, y);
    }

    updatePreviousPos(x:number, y:number){
        this.currentPos.set(x, y);
    }

    checkHorizontal(){
        let x = this.newPos.x;

        if (x > (this.canvas.width - this.creatureSize)) {
            x = this.canvas.width - this.creatureSize;
        } else if (x < 0) {
            x = 0;
        }

        return x;
    }

    checkVertical(){
        let y = this.newPos.y;

        if (y > (this.canvas.height - this.creatureSize)) {
            y = this.canvas.height - this.creatureSize;
        } else if (y < 0) {
            y = 0;
        }

        return y;
    }

    // checkCreatures(x:number, y:number){
    //     const otherCreature = this.matrix?.get(Math.round(x), Math.round(y)) as Creature;
    //     if( otherCreature !== undefined && otherCreature.UUID !== this.creatureUUID && otherCreature.alive){
    //         x = this.currentPos.x;
    //         y = this.currentPos.y;
    //     }
    // }

    get x(){
        let x = this.checkHorizontal();        

        return x;
    }

    get y(){
        let y = this.checkVertical();

        return y;
    }
}