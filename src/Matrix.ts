export default class Matrix {
    grid: GridElement[][][];
    constructor() {
        this.grid = [];
    }

    // forEach(callback: (a: GridElement, b: number, c: number) => void) {
    //     this.grid.forEach((column, x) => {
    //         column.forEach((value, y) => {
    //             callback(value, x, y);
    //         })
    //     })
    // }

    delete(x: number, y: number) {
        const col = this.grid[x];
        if (col) {
            if(col[y] !== undefined && col[y].length > 1){
                col[y].shift();
            }else{
                delete col[y];
            }
        }
    }

    set(x: number, y: number, value: GridElement) {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }

        if(this.grid[x][y] !== undefined){
            this.grid[x][y].push(value);
        }else{
            this.grid[x][y] = [];
            this.grid[x][y].push(value);
        }
    }

    get(x: number, y: number) {
        const col = this.grid[x];
        if (col) {
            if(col[y] !== undefined){
                return col[y][0];
            }
        }
        return undefined;
    }
}
