const size = 20;
export const rowSize = 28;
export const columnSize = 70;

export const gridData = (pHeight, pWidth) => {
	const data = [];
	let xPos = 50;
	let yPos = 20;
	const width = size;
	const height = size;

	for (let row = 0; row < rowSize; row++) {
		data.push([]);
		for (let column = 0; column < columnSize; column++) {
			data[row].push({
				x: column,
				y: row,
				xPos,
				yPos,
				width,
				height,
				prop: 'empty'
			});
			xPos += width;
		}
		xPos = 50;
		yPos += height;
	}
	return data;
};

export const removePreviousIfExists = (grid, property) => {
	for (let row = 0; row < rowSize; row++) {
		for (let column = 0; column < columnSize; column++) {
			if (grid[row][column].prop === property) {
				grid[row][column].prop = 'empty';
			}
		}
	}
};

export const updateGridNode = (grid, row, column, property) => {
	const targetNode = grid[row][column];
	if (property === 'start' || property === 'end') {
		console.log('updating');
		removePreviousIfExists(grid, property);
	}
	if (property === 'path') {
		if (targetNode.prop !== 'start' && targetNode.prop !== 'end') {
			// removePreviousIfExists(grid, property);
			targetNode.prop = property;
		}
	} else {
		targetNode.prop = property;
	}
	// const newGrid = [ ...grid ];
	// setGrid(newGrid);
};

export const getCoordsFromString = (node) => {
	const xColumnRE = /^\d+/;
	const yRowRE = /\d+$/;

	const xCol = Number(node.match(xColumnRE)[0]);
	const yRow = Number(node.match(yRowRE)[0]);

	return [ xCol, yRow ];
};
