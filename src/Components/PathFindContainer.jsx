import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { getCoordsFromString, gridData, updateGridNode } from '../helperFunctions';
import { breadthFirstSearch, createAdjList } from './pathfindingAlgos';

const SortName = styled.h2`
	font-size: 2.5rem;
	color: white;
	margin-bottom: 2rem;
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
	const data = [];

	useEffect(
		() => {
			console.log('path', breadthFirstSearch(start.current, end.current, createAdjList(grid)));
			const path = breadthFirstSearch(start.current, end.current, createAdjList(grid));
			console.log('coords', getCoordsFromString(path[0]));
			const svgRef = d3.select(d3Canvas.current);

			const row = svgRef.selectAll('.row').data(grid).enter().append('g').attr('class', 'row');

			const column = row
				.selectAll('.square')
				.data(function(d) {
					return d;
				})
				.enter()
				.append('rect')
				.attr('class', 'square')
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
						return 'blue';
					} else {
						return 'white';
					}
				})
				.style('stroke', '#222')
				.on('mouseover', function(e, data) {
					if (e.buttons === 1 && cursorMode.current === 'draw') {
						// d3.select(this).style('fill', 'blue');
						updateGridNode(grid, data.y, data.x, 'wall', setGrid);
					}
				})
				.on('click', function(e, data) {
					if (cursorMode.current === 'start') {
						// d3.select(this).style('fill', 'green');

						updateGridNode(grid, data.y, data.x, 'start', setGrid);

						start.current = `${data.x},${data.y}`;
					} else if (cursorMode.current === 'end') {
						// d3.select(this).style('fill', 'red');
						updateGridNode(grid, data.y, data.x, 'end', setGrid);
						end.current = `${data.x},${data.y}`;
					}
				});

			return () => {
				svgRef.selectAll('*').remove();
			};
		},
		[ data ]
	);
	return (
		<React.Fragment>
			<D3Container>
				<SortName> Pathfinder </SortName>
				<D3SVG ref={d3Canvas}>Hello</D3SVG>
			</D3Container>
			<button
				onClick={() => {
					cursorMode.current = 'start';
				}}
			>
				Start
			</button>
			<button
				onClick={() => {
					cursorMode.current = 'draw';
				}}
			>
				Draw
			</button>
			<button
				onClick={() => {
					cursorMode.current = 'end';
				}}
			>
				End
			</button>
		</React.Fragment>
	);
};

export default PathFindContainer;
