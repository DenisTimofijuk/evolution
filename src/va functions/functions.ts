export function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function displaySimulationYears() {
    const output = document.getElementById('genNumber')!;
    return function update(currentCycle: number) {
        const generation = Math.ceil(currentCycle / 200);
        output.innerText = generation.toString();
    }
}

export function displayTotalCreatures() {
    const output = document.getElementById('totCreatures')!;
    return function update(total: number) {
        output.innerText = total.toString();
    }
}


export function displayTotalFood() {
    const output = document.getElementById('totFood')!;
    return function update(total: number) {
        output.innerText = total.toString();
    }
}

export function getuuidv4() {
    //@ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
