type TraitName = 'move'

interface Trait {
    name: TraitName;
    update(a:Creature): void;
}