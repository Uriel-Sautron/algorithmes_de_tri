const fs = require('fs');

const fileName = process.argv[2];

// Méthode asynchrone
fs.readFile(fileName, 'utf8', (error, data) => {
    if (error) {
        console.error(error.message);
        return;
    }
    console.log(data);
    const listToSort = data.split(" ").map(num => parseInt(num, 10))
    bubbleSort(listToSort);
    sortByInsertion(listToSort);
});





const bubbleSort = (array) => {
    let numbers = [...array];
    let count = 0
    for (let i = numbers.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            count++
            if (numbers[j + 1] < numbers[j]) {
                [numbers[j + 1], numbers[j]] = [numbers[j], numbers[j + 1]];
            };
        }
    }
    console.log(`Tri à bulle: ${count} comparaisons - ${numbers}`);
}

const sortByInsertion = (array) => {
    let numbers = [...array];
    let count = 0;
    for (let i = 1; i < numbers.length; i++) {
        let currentNumber = numbers[i];
        let j = i;
        while (j > 0 && numbers[j - 1] > currentNumber) {
            numbers[j] = numbers[j - 1];
            j -= 1;
            count++
        }
        numbers[j] = currentNumber;
    }
    console.log(`Tri par insertion: ${count} comparaisons - ${numbers}`);
}