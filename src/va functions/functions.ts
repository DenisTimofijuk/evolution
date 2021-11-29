export function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function displaySimulationYears() {
    const output = document.getElementById('genNumber')!;
    return function update(currentCycle:number) {
        const generation = Math.ceil(currentCycle / 200);
        output.innerText = generation.toString();    
    }
}

export function displayTotalCreatures() {
    const output = document.getElementById('totCreatures')!;
    return function update(total:number) {
        output.innerText = total.toString();    
    }
}