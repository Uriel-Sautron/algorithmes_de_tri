const fs = require('fs');

const fileName = process.argv[2];

// Méthode asynchrone
fs.readFile(fileName, 'utf8', (error, data) => {
    if (error) {
        console.error(error.message);
        return;
    }
    const listToSort = data.split(" ").map(num => parseInt(num, 10))
    console.log(mergeSortMain(listToSort));
});

const mergeSortMain = (array) => {
    let numbers = [...array];
    let count = 0;

    const merge = (left, right) => {
        let arr = []

        while (left.length && right.length) {
            count++
            if (left[0] < right[0]) {
                arr.push(left.shift())
            } else {
                arr.push(right.shift())
            }
        }

        return [...arr, ...left, ...right]
    }

    const mergeSort = (numbers) => {

        if (numbers.length <= 1) {
            return numbers;
        }
        const middle = Math.floor(numbers.length / 2);

        const left = numbers.slice(0, middle);
        const right = numbers.slice(middle);

        return merge(
            mergeSort(left), mergeSort(right)
        );
    }
    numbers = mergeSort(numbers)
    return `Tri fusion: ${count} comparaisons => [${numbers}]`;

}