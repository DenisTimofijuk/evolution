import type Layer from "src/Layer";

export default class ManualMoov implements Trait {
    constructor(public name: TraitName, public self: LayerElement) {
        window.addEventListener('keydown', this.handleEventListener.bind(this));
    }


    update(layers: Map<LayerName, Layer>): void {

    }

    handleEventListener(e: KeyboardEvent) {
        e.preventDefault();
        
        switch (e.code) {
            case 'ArrowDown':
                this.self.pos.y++;
                break;
            case 'ArrowLeft':
                this.self.pos.x--;
                break;
            case 'ArrowRight':
                this.self.pos.x++;
                break;
            case 'ArrowUp':
                this.self.pos.y--;
                break;
        }
    }
}