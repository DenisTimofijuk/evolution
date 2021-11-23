/**
 * MUTATION 
 *  Randomly change any symbol to another symbol.
 *  Frequency: 1 bit randomly changes per 1000 generations
 * 
 * ENCODING
 * ------------- 
 * A135AFE3
 * -------------
 *  8 hexadecimal digits - 32 bit binary data
 *  
 *      source type (input neuron | internal neuron)
 *      source ID
 *      sink type (internal neuron | action neuron)
 *      sink ID
 *      weight
 */


export default class Gene {
    DNA: string;

    constructor() {
        this.DNA =  this.myDNA;
    }

    mutate(){
        //an array of strings in the range of [0-9] and [a-f]
    }

    private get myDNA(){
        const genRanHex = (size:number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        
        return genRanHex(8);
    }
}

function hex2bin(hex:string){
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

function getRandomNumberInRange(start:number, end:number){
    
}