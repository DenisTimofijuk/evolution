type TraitName = 'move' | 'collide' | 'aging' | 'eat';
type LayerName = 'background' | 'creatures' | 'food';

interface Trait {
    name: TraitName;
    self: LayerElement;
    update(layers: Map<LayerName, Layer>): void;
}

interface LayerElement {
    canvas: HTMLCanvasElement;
    traits: Map<TraitName, Trait>;
    addTrait(trait: Trait): void;
    draw():void;
    remove():void;
    ctx: CanvasRenderingContext2D;
    alive:boolean;
    pos: {
        x: number;
        y: number;
    };
}

type GridElement = LayerElement