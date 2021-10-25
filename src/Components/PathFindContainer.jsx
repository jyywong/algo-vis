import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { getCoordsFromString, gridData, removePreviousIfExists, updateGridNode } from '../helperFunctions';
import { aStar, breadthFirstSearch, createAdjList, greedyBFS } from './pathfindingAlgos';

const SortName = styled.h2`
	font-size: 2.5rem;
	color: white;
	margin-bottom: 2rem;
`;
const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
`;
const StyledButton = styled.button`
	cursor: pointer;
	background-color: transparent;
	border: 1px solid grey;
	border-radius: 10px;
	color: white;
	padding: 2rem;
	font-size: 2rem;
`;
const D3Container = styled.div`
	flex-grow: 1;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const D3SVG = styled.svg`
	/* height: 75%;
	width: 75%; */
	height: 600px;
	width: 1500px;
	/* background-color: green; */
`;
const PathFindContainer = () => {
	const d3Canvas = useRef();
	const cursorMode = useRef('start');
	const start = useRef();
	const end = useRef();
	// const grid = gridData(600, 1500);
	const [ grid, setGrid ] = useState(gridData(600, 1500));
	const [ animate, setAnimate ] = useState(false);
	const data = [];

	useEffect(
		() => {
			// console.log('path', breadthFirstSearch(start.current, end.current, createAdjList(grid)));
			const svgRef = d3.select(d3Canvas.current);
			const row = svgRef.selectAll('.row').data(grid).enter().append('g').attr('class', 'row');
			const calculatePath = () => {
				// const result = breadthFirstSearch(start.current, end.current, createAdjList(grid));
				// console.log('aStar', aStar(start.current, end.current, createAdjList(grid)));
				const result = aStar(start.current, end.current, createAdjList(grid));
				// const result = greedyBFS(start.current, end.current, createAdjList(grid));
				// if (typeof path !== 'undefined') {npm
				// 	removePreviousIfExists(grid, 'path');
				// 	for (const coords of path) {
				// 		const [ x, y ] = getCoordsFromString(coords);
				// 		updateGridNode(grid, y, x, 'path', setGrid);
				// 	}
				// }
				return result;
			};

			const column = row
				.selectAll('.square')
				.data(function(d) {
					return d;
				})
				.enter()
				.append('rect')
				.attr('class', 'square')
				.attr('name', (d) => String(d.x + ',' + d.y))
				.attr('x', function(d) {
					return d.xPos;
				})
				.attr('y', function(d) {
					return d.yPos;
				})
				.attr('width', function(d) {
					return d.width;
				})
				.attr('height', function(d) {
					return d.height;
				})
				.style('fill', function(d) {
					if (d.prop === 'start') {
						return 'green';
					} else if (d.prop === 'end') {
						return 'red';
					} else if (d.prop === 'wall') {
						return 'black';
					} else if (d.prop === 'path') {
						return 'yellow';
					} else {
						return 'white';
					}
				})
				.style('stroke', '#222')
				.on('mouseover', function(e, data) {
					if (e.buttons === 1 && cursorMode.current === 'draw') {
						// d3.select(this).style('fill', 'blue');
						updateGridNode(grid, data.y, data.x, 'wall', setGrid);
						// calculatePath();
					}
				})
				.on('click', function(e, data) {
					if (cursorMode.current === 'start') {
						// d3.select(this).style('fill', 'green');

						updateGridNode(grid, data.y, data.x, 'start', setGrid);
						start.current = `${data.x},${data.y}`;
						// calculatePath();
					} else if (cursorMode.current === 'end') {
						// d3.select(this).style('fill', 'red');
						updateGridNode(grid, data.y, data.x, 'end', setGrid);
						end.current = `${data.x},${data.y}`;
						// calculatePath();
					}
				});
			if (animate) {
				const [ path, animationInfo ] = calculatePath();
				(async () => {
					await animationInfo.reduce(async (previousPromise, coords) => {
						// console.log(`${coords}`);
						await previousPromise;

						if (coords !== start.current && coords !== end.current) {
							return await row
								.select(`[name="${coords}"]`)
								.transition()
								.style('fill', 'purple')
								.style('opacity', '0.2')
								.duration(10)
								.end();
						}
					}, Promise.resolve());
					path.reduce(async (previousPromise, coords) => {
						await previousPromise;
						if (coords !== start.current && coords !== end.current) {
							return await row
								.select(`[name="${coords}"]`)
								.transition()
								.style('fill', 'yellow')
								.style('opacity', '1')
								.duration(50)
								.end();
						}
					});
				})();
			}

			return () => {
				svgRef.selectAll('*').remove();
				// setAnimate(false);
			};
		},
		[ data, animate ]
	);
	return (
		<React.Fragment>
			<D3Container>
				<SortName> Pathfinder </SortName>
				<D3SVG ref={d3Canvas}>Hello</D3SVG>
			</D3Container>
			<ButtonContainer>
				<StyledButton
					onClick={() => {
						cursorMode.current = 'start';
					}}
				>
					Start
				</StyledButton>
				<StyledButton
					onClick={() => {
						cursorMode.current = 'draw';
					}}
				>
					Draw
				</StyledButton>
				<StyledButton
					onClick={() => {
						cursorMode.current = 'end';
					}}
				>
					End
				</StyledButton>
				<StyledButton
					onClick={() => {
						setAnimate(!animate);
					}}
				>
					Visualize
				</StyledButton>
			</ButtonContainer>
		</React.Fragment>
	);
};

export default PathFindContainer;
