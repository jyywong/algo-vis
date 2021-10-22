import React from 'react';
import styled from 'styled-components';

const BarContainer = styled.div`
	margin-top: auto;
	background-color: #293241;
	flex-basis: 15%;
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
const ArraySlider = styled.input`margin-top: .5rem;`;
const SortContainer = styled.div`
	width: 100%;
	flex-basis: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Options = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
	color: white;
	font-size: 1.25rem;
	margin: 0 2rem;
`;
const BottomBar = ({ arraySize, setArraySize, sortAlgo, setSortAlgo }) => {
	const handleChange = (e) => {
		setArraySize(e.target.value);
	};
	return (
		<BarContainer>
			<ArraySliderContainer>
				<Options>Array Size </Options>
				<ArraySlider type="range" min="5" max="100" value={arraySize} onChange={handleChange} />
			</ArraySliderContainer>
			<SortContainer>
				<Options
					onClick={() => {
						setSortAlgo('Merge');
					}}
				>
					Merge Sort
				</Options>
				<Options
					onClick={() => {
						setSortAlgo('Quick');
					}}
				>
					Quick Sort
				</Options>
				<Options
					onClick={() => {
						setSortAlgo('Heap');
					}}
				>
					Heap Sort
				</Options>
				<Options
					onClick={() => {
						setSortAlgo('Bubble');
					}}
				>
					Bubble Sort
				</Options>
				<Options
					onClick={() => {
						setSortAlgo('Insertion');
					}}
				>
					Insertion Sort
				</Options>
			</SortContainer>
		</BarContainer>
	);
};

export default BottomBar;
