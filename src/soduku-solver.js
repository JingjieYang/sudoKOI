/**
 * @summary Soduku object that can be constructed from 1-D array or string and can be solved with solve() method
 * @author Jingjie Yang <j.yang19@ejm.org>
 */


/**
 * @description Check for non-zero duplicate elements in array
 * @param array {Array} the array to be tested
 * @returns {boolean} true if an array contains duplicate elements that aren't equal to 0 (0 corresponds to empty cells)
 */
export function containsNonZeroDuplicate(array) {
    const nonZeroArray = array.filter((e) => e !== 0);
    return (new Set(nonZeroArray)).size !== nonZeroArray.length;
}


export class Soduku {
    /**
     * @description Construct a Soduku from an 1-D array
     * the 0's in the array represent empty cells, and other numeric values (between 1 and 9) represent given values
     * @constructor
     * @param array1D
     */
    constructor(array1D) {
        if (typeof array1D === "string") {
            array1D = Soduku.stringToArray(array1D)
        }
        if (array1D.length !== 81) throw "Error: input length mismatch";
        this.soduku = array1D;
    }

    /**
     * @description Convert sudokoi notation of a soduku into an 1-D array
     *  the sudokoi notation:
     *   Japanese characters 一, 二, 三, 四, 五, 六, 七, 八, 九 are used to represent the given values (from 1 to 9);
     *   the numbers 1 to 9 are used to represent the number of empty cells between the given values;
     *   any other characters will be ignored; you may use them for separating rows and cells visually.
     *   (recommended: '/' to separate rows and '.' to separate boxes)
     *
     * @example Soduku.stringToArray('一二三.四五六.七八九/四1六.七八九.一二三')  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 0, 6, 7, 8, 9, 1, 2, 3]
     * @param str {string}
     * @returns {Array}
     */
    static stringToArray(str) {
        const japaneseNumbers = "一二三四五六七八九";  // yes, same as Chinese
        return str.split('').reduce((array, char) => {
            if (japaneseNumbers.includes(char)) {
                array.push(japaneseNumbers.indexOf(char) + 1)
            } else {
                while (char > 0) {  // non-numeric characters are considered to be smaller than 0, so they are ignored
                    array.push(0);
                    char--
                }
            }
            return array;
        }, []);
    }

    /**
     * Check if rows, columns or boxes of the soduku contains repeated values
     * @returns {boolean}
     */
    containsConflict() {
        const BoxTopLefts = [0, 3, 6, 27, 30, 33, 54, 57, 60];
        const BoxOffsetsFromTopLeft = [0, 1, 2, 9, 10, 11, 18, 19, 20];
        for (let i = 0; i < 9; i++) {
            let row = this.soduku.slice(9 * i, 9 * i + 9);
            let col = [...new Array(9).keys()].reduce((col, index) => col.concat([this.soduku[9 * index + i]]), []);
            let box = BoxOffsetsFromTopLeft.map((offset) => this.soduku[BoxTopLefts[i] + offset]);
            if (containsNonZeroDuplicate(row) || containsNonZeroDuplicate(col) || containsNonZeroDuplicate(box)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if the soduku is solved (no empty cells and no repeated values in rows, columns or boxes)
     * @return {boolean}
     */
    isSolved() {
        return !this.containsConflict() && !this.soduku.includes(0)
    }

    /**
     * Solves the soduku using backtracking
     * Backtracking is essentially a slightly optimized brute-force method:
     * The algorithm starts from the top-left corner and works its way from left to right and row by row;
     * when it finds an unfilled cell, it starts by assigning 1 to it (and 2 and 3 and so on
     * until the value is no longer repeated in the same row, column or box);
     * then, it pushes the cell in a stack and moves on to find the next unfilled cell and repeats the process;
     * when a cell's assigned 9 and still conflicts with its row / col / box, we assign 0 to this cell
     * and pop the last cell out of the stack, and increment the value of that cell by 1 (and so on until no conflict);
     * repeat the above process until the soduku is solved.
     * @returns {Soduku}
     */
    solve() {
        let soduku = new Soduku(this.soduku);
        let i = 0;
        let stack = [];
        let backtrackNeeded = false;
        while (i < 81) {
            if (soduku.soduku[i] === 0 || backtrackNeeded) {
                if (backtrackNeeded) {
                    backtrackNeeded = false;
                }
                do {
                    soduku.soduku[i]++
                } while (soduku.containsConflict() && soduku.soduku[i] <= 9);
                if (soduku.soduku[i] > 9) {
                    soduku.soduku[i] = 0;
                    i = stack.pop();
                    backtrackNeeded = true;
                } else {
                    stack.push(i);
                    i++
                }
            } else {
                i++
            }
        }
        if (!soduku.isSolved()) throw "Error: soduku can not be solved.";
        return soduku;
    }
}