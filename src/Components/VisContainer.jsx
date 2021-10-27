import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { bubbleSort, insertionSort, mergeSortContainer, quickSortContainer } from '../SortingAlgos';
import {
	animateBubbleorInsertion,
	animateBubbleorInsertionNew,
	animateMergeSort,
	animateMergeSortNew,
	animateQuickSort
} from '../Animators';
import SortLegend from './SortLegend';

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
	height: 550px;
	width: 1500px;
	/* background-color: green; */
`;

const VisContainer = ({ arraySize, sortAlgo, animate, setAnimate }) => {
	const [ fast, setFast ] = useState(false);
	const d3Canvas = useRef();
	const timeouts = useRef([]);
	const hackAnimateCounter = useRef(false);
	const hackIDCounter = useRef('c');
	const generateArray = (quantity, max) => {
		const set = new Set();
		while (set.size < quantity) {
			set.add(Math.floor(Math.random() * max) + 1);
		}
		return set;
	};
	const dataInfo = useRef(Array.from(generateArray(arraySize, arraySize)));
	const data = dataInfo.current;

	useEffect(
		() => {
			console.log('namecounter', hackAnimateCounter);

			const svgRef = d3.select(d3Canvas.current);
			const xScale = d3.scaleBand().domain(data.map((data) => data)).rangeRound([ 0, 1500 ]).padding(0.1);
			const yScale = d3.scaleLinear().domain([ 0, arraySize ]).range([ 550, 0 ]);

			svgRef
				.selectAll('.bar')
				.data(data)
				.enter()
				.append('rect')
				.attr('fill', 'white')
				.attr('width', xScale.bandwidth())
				.attr('height', (data) => 550 - yScale(data))
				.attr('x', (data) => xScale(data))
				.attr('y', (data) => yScale(data))
				.attr('id', (d, i) => `b${i}`)
				.attr('name', (d, i) => `${d}`)
				.classed('bar', true);

			let animationRoll = [];

			if (animate) {
				if (sortAlgo === 'Bubble') {
					animationRoll = bubbleSort(data);
					animateBubbleorInsertionNew(fast, svgRef, animationRoll, hackAnimateCounter);
				} else if (sortAlgo === 'Insertion') {
					animationRoll = insertionSort(data);
					animateBubbleorInsertionNew(fast, svgRef, animationRoll, hackAnimateCounter);
				} else if (sortAlgo === 'Merge') {
					const arrayOfArrays = mergeSortContainer(data);
					animateMergeSortNew(fast, timeouts, svgRef, arrayOfArrays, hackAnimateCounter);
				} else if (sortAlgo === 'Quick') {
					const animationInfo = quickSortContainer(data);
					animateQuickSort(svgRef, animationInfo, hackAnimateCounter);
				}
			}

			return () => {
				svgRef.selectAll('*').remove();
			};
		},
		[ data, animate, sortAlgo ]
	);

	useEffect(
		() => {
			setAnimate(false);
			const newDataInfo = Array.from(generateArray(arraySize, arraySize));
			dataInfo.current = newDataInfo;
		},
		[ arraySize ]
	);

	useEffect(
		() => {
			return () => {
				if (hackAnimateCounter.current === false) {
					hackAnimateCounter.current = true;
				} else {
					hackAnimateCounter.current = false;
				}
			};
		},
		[ animate ]
	);

	return (
		<React.Fragment>
			<D3Container>
				<SortLegend sortAlgo={sortAlgo} />
				<D3SVG ref={d3Canvas}>Hello</D3SVG>
			</D3Container>
		</React.Fragment>
	);
};

export default VisContainer;
