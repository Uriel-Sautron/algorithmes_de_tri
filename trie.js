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
    insertSort(listToSort);
    selectSort(listToSort);
    quickSort(listToSort, 0, listToSort.length - 1);
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
    console.log(`Tri à bulle: ${count} comparaisons => ${numbers}`);
}

const insertSort = (array) => {
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
    console.log(`Tri par insertion: ${count} comparaisons => ${numbers}`);
}

const selectSort = (array) => {
    let numbers = [...array];
    let count = 0;
    for (let i = 0; i < numbers.length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[j] < numbers[min]) min = j;
            count++;
        }
        if (min !== i)[numbers[min], numbers[i]] = [numbers[i], numbers[min]];
    }
    console.log(`Tri par sélection: ${count} comparaisons => ${numbers}`);
}


const partition = (numbers, start, end) => {
    let count = 0;
    const pivotValue = numbers[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        count++;
        if (numbers[i] < pivotValue) { // we swap elements
            [numbers[i], numbers[pivotIndex]] = [numbers[pivotIndex], numbers[i]];
            pivotIndex++;
            // we move to next element
        };
    }
    // Putting the pivot value in the middle
    [numbers[pivotIndex], numbers[end]] = [numbers[end], numbers[pivotIndex]]
    console.log(`Tri rapide : ${count} comparaisons => ${numbers.join(" ")}`);
    return pivotIndex;
};

const quickSort = (array, start, end) => {
    let numbers = [...array]
        // Base case or terminating case
    if (start >= end) {
        return;
    }

    // Returns pivotIndex
    let index = partition(numbers, start, end);

    // Recursively apply the same logic to the left and right subnumbersays

    quickSort(numbers, start, index - 1);
    quickSort(numbers, index + 1, end);


};