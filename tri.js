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
    console.log("--------------------");
    bubbleSort(listToSort);
    console.log("--------------------");
    insertSort(listToSort);
    console.log("--------------------");
    selectSort(listToSort);
    console.log("--------------------");
    quickSortMain(listToSort);
    console.log("--------------------");
    console.log(mergeSortMain(listToSort));
    console.log("--------------------");
    heapSortMain(listToSort);
    console.log("--------------------");
    oddEvenSort(listToSort);
    console.log("--------------------");
});

// =============================== Bubble Sort ===============================

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

// =============================== Insert Sort ===============================

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

// =============================== Select Sort ===============================

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

// =============================== Quick Sort ===============================

const quickSortMain = (arrayNumbers) => {
    let array = [...arrayNumbers];
    let count = 0;

    const partition = (numbers, start, end) => {
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

        return pivotIndex;
    };

    const quickSort = (array, start, end) => {
        let numbers = [...array];
        // Base case or terminating case
        if (start >= end) {
            return;
        }

        // Returns pivotIndex
        let index = partition(numbers, start, end);

        // Recursively apply the same logic to the left and right subnumbersays

        quickSort(numbers, start, index - 1);
        quickSort(numbers, index + 1, end);

    }
    numbers = quickSort(array, 0, array.length - 1)
    console.log(`Tri rapide: ${count} comparaisons => ${numbers}`);
}

// =============================== Merge Sort ===============================

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

// =============================== Heap Sort ===============================

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

// =============================== Odd Even Sort ===============================

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
            count++
            if (numbers[i] > numbers[i + 1]) {
                [numbers[i], numbers[i + 1]] = [numbers[i + 1], numbers[i]];
                sorted = false;
            }
        }

    }
    console.log(`Tri pair-impair : ${count} comparaisons => ${numbers}`);
}