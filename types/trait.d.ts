type TraitName = 'move' | 'collide' | 'aging';

interface Trait {
    name: TraitName;
    self: Creature;
    update(): void;
}

interface LayerElements {
    canvas: HTMLCanvasElement;
    traits: Map<TraitName, Trait>;
    addTrait(trait: Trait): void;
    draw():void;
    ctx: CanvasRenderingContext2D;
    alive:boolean;
    pos: {
        x: number;
        y: number;
    };
}