import type Creature from "../world elements/Creature";
import { randomIntFromInterval } from "../va functions/functions";
import { Vec } from "../va functions/Vec";

type StraightDirection = 'N' | 'S' | 'W' | 'E';
type DiagonalDirection = 'NE' | 'SE' | 'SW' | 'NW';
const AVAILABLEDIRECTIONS:(StraightDirection | DiagonalDirection)[] = ['N', 'S', 'W', 'E', 'NE', 'SE', 'SW', 'NW'];
const STEPS_TO_REMEMBER = 2;

export default class Move implements Trait {
    velocity: number;
    direction: (StraightDirection | DiagonalDirection);
    steps: number;
    stespHistory: Vec[];
    constructor(public name: TraitName, public self: Creature) {
        this.velocity = 0;
        this.steps = 0;
        this.direction = 'E';
        this.stespHistory = [];
    }

    update() {
        if (this.steps >= 0) {
            this.walk();
        } else {
            this.chooseDirection();
            this.chooseAmountOfSteps();
        }
    }

    walk() {
        switch (this.direction) {
            case 'N':
                this.self.pos.y -= this.velocity;
                break;
            case 'S':
                this.self.pos.y += this.velocity;
                break;
            case 'W':
                this.self.pos.x -= this.velocity;
                break;
            case 'E':
                this.self.pos.x += this.velocity;
                break;
            case 'NE':
                this.self.pos.y -= this.velocity;
                this.self.pos.x += this.velocity;
                break;
            case 'NW':
                this.self.pos.y -= this.velocity;
                this.self.pos.x -= this.velocity;
                break;
            case 'SE':
                this.self.pos.y += this.velocity;
                this.self.pos.x += this.velocity;
                break;
            case 'SW':
                this.self.pos.y += this.velocity;
                this.self.pos.x -= this.velocity;
                break;
            default:
                break;
        }

        this.steps--;
        this.recordHistory();
    }

    chooseDirection() {
        this.direction = AVAILABLEDIRECTIONS[randomIntFromInterval(0, AVAILABLEDIRECTIONS.length-1)];
    }

    chooseAmountOfSteps() {
        this.steps = randomIntFromInterval(0, 50);
    }

    recordHistory(){
        const pos = new Vec();
        pos.set(this.self.pos.x, this.self.pos.y);
        this.stespHistory.push( pos );
        if(this.stespHistory.length >= STEPS_TO_REMEMBER){
            const sliceIndex = STEPS_TO_REMEMBER*(-1);
            this.stespHistory = this.stespHistory.slice(sliceIndex);
        }
    }
}