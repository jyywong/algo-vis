import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { bubbleSort, insertionSort, mergeSortContainer } from '../SortingAlgos';
import { animateBubbleorInsertion, animateMergeSort } from '../Animators';

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

const VisContainer = ({ arraySize, sortAlgo }) => {
	const [ fast, setFast ] = useState(false);
	const d3Canvas = useRef();
	const timeouts = useRef([]);
	const generateArray = (quantity, max) => {
		const set = new Set();
		while (set.size < quantity) {
			set.add(Math.floor(Math.random() * max) + 1);
		}
		return set;
	};
	const data = Array.from(generateArray(arraySize, arraySize));
	useEffect(
		() => {
			console.log(timeouts);
			timeouts.current.forEach((val) => {
				clearTimeout(val);
			});
		},
		[ sortAlgo, arraySize ]
	);
	useEffect(
		() => {
			const svgRef = d3.select(d3Canvas.current);
			const xScale = d3.scaleBand().domain(data.map((data) => data)).rangeRound([ 0, 1500 ]).padding(0.1);
			const yScale = d3.scaleLinear().domain([ 0, arraySize ]).range([ 600, 0 ]);

			svgRef
				.selectAll('.bar')
				.data(data)
				.enter()
				.append('rect')
				.attr('fill', 'white')
				.attr('width', xScale.bandwidth())
				.attr('height', (data) => 600 - yScale(data))
				.attr('x', (data) => xScale(data))
				.attr('y', (data) => yScale(data))
				// .attr('id', (d) => `b${d}`)
				.attr('id', (d, i) => `b${i}`)
				.attr('name', (d, i) => `${d}`)
				.classed('bar', true);

			let animationRoll = [];

			if (sortAlgo === 'Bubble') {
				animationRoll = bubbleSort(data);
				animateBubbleorInsertion(fast, timeouts, svgRef, animationRoll);
			} else if (sortAlgo === 'Insertion') {
				animationRoll = insertionSort(data);
				animateBubbleorInsertion(fast, timeouts, svgRef, animationRoll);
			} else if (sortAlgo === 'Merge') {
				const [ result, mergeAnimation, arrayOfArrays ] = mergeSortContainer(data);
				console.log(arrayOfArrays);
				animateMergeSort(fast, timeouts, svgRef, arrayOfArrays);
			}

			return () => {
				svgRef.selectAll('*').remove();
			};
		},
		[ data ]
	);
	return (
		<React.Fragment>
			<D3Container>
				<SortName>{sortAlgo} Sort</SortName>
				<D3SVG ref={d3Canvas}>Hello</D3SVG>
			</D3Container>
		</React.Fragment>
	);
};

export default VisContainer;
