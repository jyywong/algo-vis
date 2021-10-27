import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BarContainer = styled.div`
	margin-top: auto;
	background-color: #293241;
	height: 25vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const ArraySliderContainer = styled.div`
	width: 100%;
	flex-basis: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const ArraySlider = styled.input`
	margin-top: .5rem;
	width: 35%;
`;
const SortContainer = styled(motion.div)`
	width: 100%;
	flex-basis: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Options = styled(motion.button)`
	background-color: transparent;
	border: none;
	cursor: pointer;
	color: ${(props) => (props.isCurrentAlgo ? '#EE6C4D' : 'white')};
	font-size: ${(props) => (props.isCurrentAlgo ? '3rem' : '1.25rem')};
	margin: 0 2rem;
	transition: color 1s;
`;
const OptionsLabel = styled.div`
	color: #bff6f8;
	font-size: 1.25rem;
`;

const StartButton = styled(motion.button)`
	background-color: ${(props) => (props.animate ? '#4d8138' : 'transparent')};
	border: ${(props) => (props.animate ? '3px solid transparent' : '3px solid #813838')};
	border-radius: 10px;
	cursor: pointer;
	font-size: 2rem;
	padding: .5rem 1rem;
	margin: 0 2rem;
	color: white;
	margin-bottom: .5rem;
	transition: all .5s;

`;
const BottomBar = ({ arraySize, setArraySize, setSortAlgo, animate, setAnimate, sortAlgo }) => {
	const handleChange = (e) => {
		setArraySize(e.target.value);
	};
	return (
		<BarContainer>
			<ArraySliderContainer>
				<OptionsLabel>Array Size: </OptionsLabel>
				<ArraySlider type="range" min="5" max="50" value={arraySize} onChange={handleChange} />
			</ArraySliderContainer>
			<OptionsLabel>Sorting Algorithm: </OptionsLabel>
			<SortContainer layout>
				<Options
					isCurrentAlgo={sortAlgo === 'Merge'}
					onClick={() => {
						setSortAlgo('Merge');
					}}
					layout
				>
					Merge Sort
				</Options>
				<Options
					isCurrentAlgo={sortAlgo === 'Quick'}
					onClick={() => {
						setSortAlgo('Quick');
					}}
					layout
				>
					Quick Sort
				</Options>

				<Options
					isCurrentAlgo={sortAlgo === 'Bubble'}
					onClick={() => {
						setSortAlgo('Bubble');
					}}
					layout
				>
					Bubble Sort
				</Options>
				<Options
					isCurrentAlgo={sortAlgo === 'Insertion'}
					onClick={() => {
						setSortAlgo('Insertion');
					}}
					layout
				>
					Insertion Sort
				</Options>
			</SortContainer>
			<StartButton
				animate={animate}
				onClick={() => {
					setAnimate(!animate);
				}}
			>
				Animate {animate ? 'On' : 'Off'}
			</StartButton>
		</BarContainer>
	);
};

export default BottomBar;
