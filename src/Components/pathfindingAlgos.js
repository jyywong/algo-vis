export const createAdjList = (grid) => {
	const adjacencyList = new Map();

	const addNode = (id) => {
		adjacencyList.set(id, new Set());
	};

	const addEdge = (origin, destination) => {
		adjacencyList.get(origin).add(destination);
		adjacencyList.get(destination).add(origin);
	};

	for (let row = 0; row < 14; row++) {
		for (let column = 0; column < 35; column++) {
			addNode(String(column + ',' + row));
		}
	}
	for (let row = 0; row < 14; row++) {
		for (let column = 0; column < 35; column++) {
			const currentNode = String(column + ',' + row);
			// Look up
			if (grid[row][column].prop !== 'wall') {
				if (row > 0) {
					const nodeAbove = `${column},${row - 1}`;

					if (grid[row - 1][column].prop !== 'wall') {
						addEdge(currentNode, nodeAbove);
					}
				}
				// Look down
				if (row < 13) {
					const nodeBelow = `${column},${row + 1}`;

					if (grid[row + 1][column].prop !== 'wall') {
						addEdge(currentNode, nodeBelow);
					}
				}
				// Look left
				if (column > 0) {
					const nodeLeft = `${column - 1},${row}`;

					if (grid[row][column - 1].prop !== 'wall') {
						addEdge(currentNode, nodeLeft);
					}
				}
				// Look right
				if (column < 34) {
					const nodeRight = `${column + 1},${row}`;

					if (grid[row][column + 1].prop !== 'wall') {
						addEdge(currentNode, nodeRight);
					}
				}
			}
		}
	}

	return adjacencyList;
};

export const breadthFirstSearch = (start, end, adjList) => {
	const visitedNodes = new Set();
	const queue = [ { node: start, path: [] } ];

	while (queue.length > 0) {
		const { node, path } = queue.shift();
		if (typeof path !== 'undefined') {
			path.push(node);
		}

		if (node === end) {
			return path;
		}

		const adjacencies = adjList.get(node);

		for (const adjacency of adjacencies) {
			if (!visitedNodes.has(adjacency)) {
				visitedNodes.add(adjacency);

				queue.push({ node: adjacency, path: [ ...path ] });
			}
		}
	}
};
