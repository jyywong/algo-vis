export const bubbleSort = (data) => {
	const dataCopy = [ ...data ];
	const animationRoll = [];
	let previous = null;
	for (let i = 0; i < dataCopy.length; i++) {
		for (let j = 0; j < dataCopy.length - i - 1; j++) {
			const animationFrame = { previous, comparison: [ dataCopy[j], dataCopy[j + 1] ], swap: false };
			if (dataCopy[j] > dataCopy[j + 1]) {
				let temp = dataCopy[j];
				dataCopy[j] = dataCopy[j + 1];
				dataCopy[j + 1] = temp;
				animationFrame.swap = true;
			}
			animationRoll.push(animationFrame);
			previous = dataCopy[j];
		}
	}
	return animationRoll;
};

export const insertionSort = (data) => {
	const animationRoll = [];
	const dataCopy = [ ...data ];
	let i, key, j;
	for (i = 1; i < dataCopy.length; i++) {
		key = dataCopy[i];
		j = i - 1;
		const animationFrame = { comparison: [ dataCopy[j], key ] };
		animationRoll.push(animationFrame);
		/* Move elements of dataCopy[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
		while (j >= 0 && dataCopy[j] > key) {
			const swapFrame = { comparison: [ dataCopy[j], key ], swap: true };

			dataCopy[j + 1] = dataCopy[j];
			j = j - 1;
			animationRoll.push(swapFrame);
		}
		dataCopy[j + 1] = key;
	}
	return animationRoll;
};

export const mergeSortContainer = (data) => {
	const animationRoll = [];
	const arrayOfArrays = [];
	const dataCopy = [ ...data ];
	const dataReference = [ ...data ];
	const mergeSort = (dataCopy) => {
		const findMaxAndMinIndex = (sortArray) => {
			let max = 0;
			let min = 100;
			sortArray.forEach((val) => {
				const initialIndex = dataReference.indexOf(val);
				if (initialIndex < min) {
					min = initialIndex;
				}
				if (initialIndex > max) {
					max = initialIndex;
				}
			});
			return [ min, max ];
		};
		const merge = (left, right) => {
			const sortedArray = [];
			while (left.length && right.length) {
				const animationFrame = { comparison: [ left[0], right[0] ], swap: true };
				if (left[0] < right[0]) {
					sortedArray.push(left.shift());
				} else {
					sortedArray.push(right.shift());
				}
				animationRoll.push(animationFrame);
			}
			// const finalSortedArray = [ ...sortedArray, ...left, ...right ];

			const arrayLocation = findMaxAndMinIndex([ ...sortedArray, ...left, ...right ]);

			arrayOfArrays.push([ [ ...sortedArray, ...left, ...right ], arrayLocation ]);
			return [ ...sortedArray, ...left, ...right ];
		};

		const half = dataCopy.length / 2;
		if (dataCopy.length <= 1) {
			return dataCopy;
		}
		const left = dataCopy.splice(0, half);
		const right = dataCopy;

		return merge(mergeSort(left), mergeSort(right));
	};
	mergeSort(dataCopy);
	return arrayOfArrays;
};

export const quickSortContainer = (data) => {
	const animationInfo = [];
	const partition = (array, start, end) => {
		const pivotValue = array[end];
		let pivotIndex = start;

		for (let i = start; i < end; i++) {
			if (array[i] < pivotValue) {
				// Swap elements
				const animationFrame = {
					pivotValue: array[pivotIndex],
					swappers: [],
					section: [ start, end ],
					movePivot: false,
					actualPivot: array[end]
				};
				animationFrame.swappers.push(array[i], array[pivotIndex]);
				animationInfo.push(animationFrame);
				[ array[i], array[pivotIndex] ] = [ array[pivotIndex], array[i] ];
				pivotIndex++;
			}
		}
		// Puts pivot value in middle
		animationInfo.push({
			pivotValue: array[pivotIndex],
			swappers: [ array[pivotIndex], array[end] ],
			section: [ start, end ],
			movePivot: true,
			actualPivot: array[start + end]
		});
		[ array[pivotIndex], array[end] ] = [ array[end], array[pivotIndex] ];
		return pivotIndex;
	};
	const quickSort = (array, start, end) => {
		if (start >= end) {
			return;
		}

		let index = partition(array, start, end);

		quickSort(array, start, index - 1);
		quickSort(array, index + 1, end);
	};
	const arrayToSort = [ ...data ];
	quickSort(arrayToSort, 0, arrayToSort.length - 1);
	return animationInfo;
};
