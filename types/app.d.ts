type TraitName = 'move' | 'collide' | 'aging' | 'eat';

interface Trait {
    name: TraitName;
    self: LayerElements;
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