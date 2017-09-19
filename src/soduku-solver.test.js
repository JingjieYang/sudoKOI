import {containsNonZeroDuplicate, Soduku} from './soduku-solver'


describe("containsNonZeroDuplicate(array)", () => {
    test("[]", () => {
        expect(containsNonZeroDuplicate([])).toBe(false);
    });
    test("[0, 1, 2]", () => {
        expect(containsNonZeroDuplicate([0, 1, 2])).toBe(false);
    });
    test("[0, 1, 0]", () => {
        expect(containsNonZeroDuplicate([0, 1, 0])).toBe(false);
    });
    test("[1, 1, 2]", () => {
        expect(containsNonZeroDuplicate([1, 1, 2])).toBe(true);
    })
});


describe("Soduku", () => {
    describe("containsConflict()", () => {
        test("empty", () => {
            const emptySoduku = new Soduku("9/9/9/9/9/9/9/9/9");
            expect(emptySoduku.containsConflict()).toBe(false);
        });
        test("complete", () => {
            const completeSoduku = new Soduku(
                "一二三.四五六.七八九" +
                "四五六.七八九.一二三" +
                "七八九.一二三.四五六" +

                "二三四.五六七.八九一" +
                "五六七.八九一.二三四" +
                "八九一.二三四.五六七" +

                "三四五.六七八.九一二" +
                "六七八.九一二.三四五" +
                "九一二.三四五.六七八"
            );
            expect(completeSoduku.containsConflict()).toBe(false);
        });
        test("row", () => {
            const sodukuWithConflictInRow = new Soduku("一一7/9/9/9/9/9/9/9/9");
            expect(sodukuWithConflictInRow.containsConflict()).toBe(true);
        });
        test("col", () => {
            const sodukuWithConflictInCol = new Soduku("一8/一8/9/9/9/9/9/9/9");
            expect(sodukuWithConflictInCol.containsConflict()).toBe(true);
        });
        test("box", () => {
            const sodukuWithConflictInBox = new Soduku("一8/1一7/9/9/9/9/9/9/9");
            expect(sodukuWithConflictInBox.containsConflict()).toBe(true);
        });
    });

    describe("solve()", () => {
        test("empty", () => {
            const emptySoduku = new Soduku("9/9/9/9/9/9/9/9/9");
            expect(emptySoduku.solve().isSolved()).toBe(true);
        });
        test("Pythagore", () => {
            const pythagoreSoduku = new Soduku([
                0, 0, 0, 7, 5, 0, 0, 9, 0,
                9, 1, 0, 0, 0, 3, 0, 0, 0,
                0, 0, 5, 4, 0, 0, 7, 0, 0,
                0, 0, 0, 0, 7, 5, 0, 1, 8,
                6, 0, 0, 0, 0, 0, 0, 0, 3,
                5, 7, 0, 8, 1, 0, 0, 0, 0,
                0, 0, 8, 0, 0, 4, 2, 0, 0,
                0, 0, 0, 2, 0, 0, 0, 8, 6,
                0, 4, 0, 0, 9, 8, 0, 0, 0
            ]);
            const solvedSoduku = pythagoreSoduku.solve();
            // Soduku starts at 1
            const valueToLetterTable = ["", "G", "Y", "R", "A", "P", "O", "H", "T", "E"];
            // Array starts at 0
            const fifthColumn = [...new Array(9).keys()].map((j) => valueToLetterTable[solvedSoduku.soduku[9 * j + 4]]);
            expect(solvedSoduku.isSolved()).toBe(true);
            expect(fifthColumn.join("")).toBe("PYTHAGORE");
        })
    })
});
