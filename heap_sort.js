const fs = require('fs');

const fileName = process.argv[2];

// Méthode asynchrone
fs.readFile(fileName, 'utf8', (error, data) => {
    if (error) {
        console.error(error.message);
        return;
    }
    const listToSort = data.split(" ").map(num => parseInt(num, 10))
    heapSortMain(listToSort);
});

const heapSortMain = (array) => {
    let numbers = [...array];
    let count = 0;

    const heapSort = (numbers) => {

        buildMaxHeap(numbers); //we build max heap here

        lastElement = numbers.length - 1; // get last element

        //heap sorting until there is 1 element left
        while (lastElement > 0) {

            swap(numbers, 0, lastElement);

            heapify(numbers, 0, lastElement);

            lastElement -= 1
        };
        return numbers
    };

    const buildMaxHeap = (numbers) => {
        let i;
        i = numbers.length / 2 - 1;
        i = Math.floor(i);

        //build a max heap out of all array elements passed in
        while (i >= 0) {
            heapify(numbers, i, numbers.length);
            i -= 1;
        };
    };

    const heapify = (heap, i, max) => {
        while (i < max) {
            count++;
            index = i;

            leftChild = 2 * i + 1;
            righChild = leftChild + 1;

            if (leftChild < max && heap[leftChild] > heap[index]) {
                index = leftChild;
            }

            if (righChild < max && heap[righChild] > heap[index]) {
                index = righChild;
            }

            if (index == i) {
                return;
            }

            swap(heap, i, index);

            i = index;
        }
    };

    const swap = (numbers, firstItemIndex, lastItemsInde) => {
        let tmp = numbers[firstItemIndex];

        // Swap first and last items in the array
        numbers[firstItemIndex] = numbers[lastItemsInde];
        numbers[lastItemsInde] = tmp;
    }

    numbers = heapSort(numbers);
    console.log(`Tri par tas : ${count} comparaisons => ${numbers}`);
}