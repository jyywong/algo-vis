export const bubbleSort = (data) => {
	const animationRoll = [];
	let previous = null;
	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data.length - i - 1; j++) {
			const animationFrame = { previous, comparison: [ data[j], data[j + 1] ], swap: false };
			if (data[j] > data[j + 1]) {
				let temp = data[j];
				data[j] = data[j + 1];
				data[j + 1] = temp;
				animationFrame.swap = true;
			}
			animationRoll.push(animationFrame);
			previous = data[j];
		}
	}
	return animationRoll;
};

export const insertionSort = (data) => {
	const animationRoll = [];
	let i, key, j;
	for (i = 1; i < data.length; i++) {
		key = data[i];
		j = i - 1;
		const animationFrame = { comparison: [ data[j], key ] };
		animationRoll.push(animationFrame);
		/* Move elements of data[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
		while (j >= 0 && data[j] > key) {
			const swapFrame = { comparison: [ data[j], key ], swap: true };

			data[j + 1] = data[j];
			j = j - 1;
			animationRoll.push(swapFrame);
		}
		data[j + 1] = key;
	}
	return animationRoll;
};

export const mergeSortContainer = (data) => {
	const animationRoll = [];
	const arrayOfArrays = [];
	const dataReference = [ ...data ];
	const mergeSort = (data) => {
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

		const half = data.length / 2;
		if (data.length <= 1) {
			return data;
		}
		const left = data.splice(0, half);
		const right = data;

		return merge(mergeSort(left), mergeSort(right));
	};
	return [ mergeSort(data), animationRoll, arrayOfArrays ];
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
