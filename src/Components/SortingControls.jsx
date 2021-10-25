import React from 'react';
import styled from 'styled-components';

const Options = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
	color: white;
	font-size: 1.25rem;
	margin: 0 2rem;
	height: 50%;
`;

const SortingControls = ({ setCursorMode }) => {
	return (
		<React.Fragment>
			<Options
				onClick={() => {
					setCursorMode('start');
				}}
			>
				Start Node
			</Options>
			<Options
				onClick={() => {
					setCursorMode('end');
				}}
			>
				End Node
			</Options>
		</React.Fragment>
	);
};

export default SortingControls;
