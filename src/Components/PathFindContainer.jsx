import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import styled from 'styled-components';
import * as d3 from 'd3';
import { gridData, updateGridNode } from '../helperFunctions';
import { aStar, breadthFirstSearch, createAdjList, greedyBFS } from './pathfindingAlgos';
import PathLegend from './PathLegend';

const ControlsContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #293241;
	height: 25vh;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	padding: 0 5rem;
`;
const AlgoContainer = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
`;
const AlgoHeader = styled.div`
	margin-top: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #bff6f8;
	font-size: 1.25rem;
`;
const AlgoOptionsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const AlgoOption = styled(motion.button)`
	cursor: pointer;
	background-color: transparent;
	border: none;
	font-size: ${(props) => (props.isCurrentPath ? '3rem' : '1.25rem')};
	color: ${(props) => (props.isCurrentPath ? '#EE6C4D' : 'white')};
	margin: .2rem 2rem;
	transition: color 1s;
`;
const Highlighter = styled(motion.div)`
	border-radius: 10px;
	position: absolute;
	top: -5%;
	left: -5%;
	right: -5%;
	bottom: -5%;
	z-index: 1;
	border: ${(props) => `4px solid ${props.color}`};
`;
const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;
const SubButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;
const CursorContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const CursorLabel = styled.div`
	color: #bff6f8;
	font-size: 1.25rem;
`;
const CursorButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-left: 2px solid white;
	border-right: 2px solid white;
	border-radius: 10px;
`;

const ResetButton = styled.button`
	cursor: pointer;
	background-color: transparent;
	border: 1px solid;
	border-radius: 10px;
	color: white;
	padding: .25rem 3.25rem;
	margin: .2rem 1rem;
	font-size: 1.5rem;
`;
const StyledButton = styled.button`
	position: relative;
	cursor: pointer;
	background-color: transparent;
	border: none;
	border-radius: 10px;
	color: white;
	padding: .25rem 2rem;
	margin: .2rem 1rem;
	font-size: 1.5rem;
`;
const VisualizeButton = styled.button`
	cursor: pointer;
	background-color: ${(props) => (props.animate ? '#98c1d9' : 'transparent')};
	border: 3px solid #98c1d9;
	border-radius: 10px;
	color: ${(props) => (props.animate ? '#293241' : 'white')};
	padding: .25rem 2rem;
	margin: 1rem;

	font-size: 1.5rem;
	transition: all .5s;
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
	// const cursorMode = useRef('start');
	const [ cursorMode, setCursorMode ] = useState('start');
	const [ pathMode, setPathMode ] = useState('dijk');
	const start = useRef();
	const end = useRef();
	const grid = useRef(gridData(600, 1500));
	// const [ grid, setGrid ] = useState(gridData(600, 1500));
	const [ animate, setAnimate ] = useState(false);
	const [ reset, setReset ] = useState(false);

	useEffect(
		() => {
			const actualGrid = grid.current;
			// console.log('path', breadthFirstSearch(start.current, end.current, createAdjList(grid)));
			const svgRef = d3.select(d3Canvas.current);
			const row = svgRef.selectAll('.row').data(actualGrid).enter().append('g').attr('class', 'row');
			const calculatePath = () => {
				let result;
				if (pathMode === 'dijk') {
					result = breadthFirstSearch(start.current, end.current, createAdjList(actualGrid));
					console.log('result', result);
				} else if (pathMode === 'a*') {
					result = aStar(start.current, end.current, createAdjList(actualGrid));
				} else if (pathMode === 'gbfs') {
					result = greedyBFS(start.current, end.current, createAdjList(actualGrid));
				}

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
					if (e.buttons === 1 && cursorMode === 'draw') {
						d3.select(this).style('fill', 'black');
						updateGridNode(actualGrid, data.y, data.x, 'wall');
					}
				})
				.on('click', function(e, data) {
					console.log(cursorMode);
					if (cursorMode === 'start') {
						d3.select(`[name="${start.current}"]`).style('fill', 'white');
						d3.select(this).style('fill', 'green');

						updateGridNode(actualGrid, data.y, data.x, 'start');
						start.current = `${data.x},${data.y}`;
					} else if (cursorMode === 'end') {
						d3.select(`[name="${end.current}"]`).style('fill', 'white');
						d3.select(this).style('fill', 'red');
						updateGridNode(actualGrid, data.y, data.x, 'end');
						end.current = `${data.x},${data.y}`;
					}
				});
			if (animate) {
				const [ path, animationInfo ] = calculatePath();
				(async () => {
					await animationInfo.reduce(async (previousPromise, coords) => {
						console.log(`pathframe`, coords);
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
					if (path.length > 0) {
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
					}
				})();
			}

			return () => {
				svgRef.selectAll('*').remove();
			};
		},
		[ animate, reset, cursorMode, pathMode ]
	);
	return (
		<React.Fragment>
			<D3Container>
				<PathLegend />
				<D3SVG ref={d3Canvas}>Hello</D3SVG>
			</D3Container>
			<ControlsContainer>
				<AlgoContainer layout>
					<AlgoHeader>Pathfinding Algorithm:</AlgoHeader>
					<AlgoOptionsContainer>
						<AlgoOption
							isCurrentPath={pathMode === 'dijk'}
							onClick={() => {
								setPathMode('dijk');
							}}
							layout
						>
							Dijkstra's
						</AlgoOption>

						<AlgoOption
							isCurrentPath={pathMode === 'gbfs'}
							onClick={() => {
								setPathMode('gbfs');
							}}
							layout
						>
							Greedy Best First Search
						</AlgoOption>
						<AlgoOption
							isCurrentPath={pathMode === 'a*'}
							onClick={() => {
								setPathMode('a*');
							}}
							layout
						>
							A*
						</AlgoOption>
					</AlgoOptionsContainer>
				</AlgoContainer>
				<ButtonContainer>
					<CursorContainer>
						<CursorLabel>Cursor Mode:</CursorLabel>
						<SubButtonContainer>
							<ResetButton
								onClick={() => {
									grid.current = gridData(600, 1500);
									start.current = null;
									end.current = null;
									setReset(!reset);
								}}
							>
								Reset
							</ResetButton>
							<CursorButtonsContainer>
								<AnimateSharedLayout>
									<StyledButton
										cMode={cursorMode === 'start'}
										onClick={() => {
											setCursorMode('start');
										}}
									>
										Start Node
										{cursorMode === 'start' && <Highlighter color="#4d8138" layoutId="highlight" />}
									</StyledButton>
									<StyledButton
										cMode={cursorMode === 'end'}
										onClick={() => {
											setCursorMode('end');
										}}
									>
										End Node
										{cursorMode === 'end' && <Highlighter color="#813838" layoutId="highlight" />}
									</StyledButton>
									<StyledButton
										cMode={cursorMode === 'draw'}
										onClick={() => {
											setCursorMode('draw');
										}}
									>
										Walls
										{cursorMode === 'draw' && <Highlighter color="#838383" layoutId="highlight" />}
									</StyledButton>
								</AnimateSharedLayout>
							</CursorButtonsContainer>
							<VisualizeButton
								animate={animate}
								onClick={() => {
									setAnimate(!animate);
								}}
							>
								Visualize{animate ? ' On' : ' Off'}
							</VisualizeButton>
						</SubButtonContainer>
					</CursorContainer>
				</ButtonContainer>
			</ControlsContainer>
		</React.Fragment>
	);
};

export default PathFindContainer;
