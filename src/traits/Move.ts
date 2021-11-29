import type Creature from "../world elements/Creature";
import { randomIntFromInterval } from "../va functions/functions";

type StraightDirection = 'N' | 'S' | 'W' | 'E';
type DiagonalDirection = 'NE' | 'SE' | 'SW' | 'NW';
const AVAILABLEDIRECTIONS:(StraightDirection | DiagonalDirection)[] = ['N', 'S', 'W', 'E', 'NE', 'SE', 'SW', 'NW'];

export default class Move implements Trait {
    velocity: number;
    direction: (StraightDirection | DiagonalDirection);
    steps: number;
    constructor(public name: TraitName, public self: Creature) {
        this.velocity = 0;
        this.steps = 0;
        this.direction = 'E';
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
    }

    chooseDirection() {
        this.direction = AVAILABLEDIRECTIONS[randomIntFromInterval(0, AVAILABLEDIRECTIONS.length-1)];
    }

    chooseAmountOfSteps() {
        this.steps = randomIntFromInterval(0, 50);
    }
}