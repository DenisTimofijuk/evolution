export default class Neuron {
    id: string;
    type?: string;
    constructor() {
        this.id = this.myID;
    }

    private get myID(){
        return '';
    }

    setType(name:string){
        this.type = name;
    }
}