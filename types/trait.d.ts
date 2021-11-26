type TraitName = 'move' | 'collide'

interface Trait {
    name: TraitName;
    update(): void;
}