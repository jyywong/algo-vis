import { columnSize, getCoordsFromString, rowSize } from '../helperFunctions';

export const createAdjList = (grid) => {
	const adjacencyList = new Map();

	const addNode = (id) => {
		adjacencyList.set(id, new Set());
	};

	const addEdge = (origin, destination) => {
		adjacencyList.get(origin).add(destination);
		adjacencyList.get(destination).add(origin);
	};

	for (let row = 0; row < rowSize; row++) {
		for (let column = 0; column < columnSize; column++) {
			addNode(String(column + ',' + row));
		}
	}
	for (let row = 0; row < rowSize; row++) {
		for (let column = 0; column < columnSize; column++) {
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
	const animationInfo = [];
	while (queue.length > 0) {
		const { node, path } = queue.shift();
		if (typeof path !== 'undefined') {
			path.push(node);
		}
		animationInfo.push(node);

		if (node === end) {
			return [ path, animationInfo ];
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

class QElement {
	constructor(element, priority) {
		this.element = element;
		this.priority = priority;
	}
}
class PriorityQueue {
	constructor() {
		this.items = [];
	}

	enqueue(element, priority) {
		const qElement = new QElement(element, priority);
		let contain = false;

		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].priority > qElement.priority) {
				this.items.splice(i, 0, qElement);
				contain = true;
				break;
			}
		}
		if (!contain) {
			this.items.push(qElement);
		}
	}
	dequeue() {
		if (this.isEmpty()) {
			return 'Underflow';
		}
		return this.items.shift();
	}
	isEmpty() {
		return this.items.length === 0;
	}
}

const calculateManhattanDistance = (node, endNode) => {
	const [ nodeX, nodeY ] = node;
	const [ endNodeX, endNodeY ] = endNode;

	const distance = Math.abs(Number(endNodeX) - nodeX) + Math.abs(Number(endNodeY) - nodeY);
	return distance;
};

export const aStar = (start, end, adjList) => {
	const visitedNodes = new Set();
	const pQueue = new PriorityQueue();
	pQueue.enqueue({ node: start, path: [] }, 0);

	const animationInfo = [];
	while (pQueue.items.length > 0) {
		const { node, path } = pQueue.dequeue().element;

		let costFromStart;
		if (typeof path !== 'undefined') {
			costFromStart = path.length;

			path.push(node);
		}
		animationInfo.push(node);

		if (node === end) {
			return [ path, animationInfo ];
		}

		const adjacencies = adjList.get(node);

		for (const adjacency of adjacencies) {
			if (!visitedNodes.has(adjacency)) {
				visitedNodes.add(adjacency);
				const neighborCostFromStart = costFromStart + 1;

				const neighborNodeCoords = getCoordsFromString(adjacency);
				const endCoords = getCoordsFromString(end);
				const costToEnd = calculateManhattanDistance(neighborNodeCoords, endCoords);
				console.log(node, end, 'costtoend', costToEnd);
				const priority = neighborCostFromStart + costToEnd;

				pQueue.enqueue({ node: adjacency, path: [ ...path ] }, priority);
				console.log(pQueue);
			}
		}
	}
};

export const greedyBFS = (start, end, adjList) => {
	const visitedNodes = new Set();
	const pQueue = new PriorityQueue();
	pQueue.enqueue({ node: start, path: [] }, 0);

	const animationInfo = [];
	while (pQueue.items.length > 0) {
		const { node, path } = pQueue.dequeue().element;

		let costFromStart;
		if (typeof path !== 'undefined') {
			costFromStart = path.length;

			path.push(node);
		}
		animationInfo.push(node);

		if (node === end) {
			return [ path, animationInfo ];
		}

		const adjacencies = adjList.get(node);

		for (const adjacency of adjacencies) {
			if (!visitedNodes.has(adjacency)) {
				visitedNodes.add(adjacency);
				// const neighborCostFromStart = costFromStart + 1;

				const neighborNodeCoords = getCoordsFromString(adjacency);
				const endCoords = getCoordsFromString(end);
				const costToEnd = calculateManhattanDistance(neighborNodeCoords, endCoords);
				console.log(node, end, 'costtoend', costToEnd);
				const priority = costToEnd;

				pQueue.enqueue({ node: adjacency, path: [ ...path ] }, priority);
				console.log(pQueue);
			}
		}
	}
};
