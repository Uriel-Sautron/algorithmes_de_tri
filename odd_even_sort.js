const fs = require('fs');

const fileName = process.argv[2];

// Méthode asynchrone
fs.readFile(fileName, 'utf8', (error, data) => {
    if (error) {
        console.error(error.message);
        return;
    }
    const listToSort = data.split(" ").map(num => parseInt(num, 10))
    oddEvenSort(listToSort);
});


const oddEvenSort = (array) => {
    let numbers = [...array];
    let sorted = false;
    let count = 0;
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < numbers.length - 1; i += 2) {
            count++
            if (numbers[i] > numbers[i + 1]) {
                [numbers[i], numbers[i + 1]] = [numbers[i + 1], numbers[i]];
                sorted = false;
            }
        }
        for (let i = 1; i < numbers.length - 1; i += 2) {
            if (numbers[i] > numbers[i + 1]) {
                [numbers[i], numbers[i + 1]] = [numbers[i + 1], numbers[i]];
                sorted = false;
            }
        }

    }
    console.log(`Tri pair-impair : ${count} comparaisons => ${numbers}`);
}