import { getuuidv4 } from "src/va functions/functions";

export default class Neuron {
    id: string;
    type?: string;
    UUID: string;
    constructor() {
        this.id = this.myID;
        this.UUID = '' + getuuidv4();
    }

    private get myID(){
        return '';
    }

    setType(name:NeuronType){
        this.type = name;
    }
}