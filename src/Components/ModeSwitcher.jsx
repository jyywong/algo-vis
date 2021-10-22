import React from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
	margin-left: auto;
	background-color: #293241;
	border-radius: 10px;
	border: solid 3px #98c1d9;
	display: flex;
	align-items: center;
`;
const Options = styled.h4`
	margin: .75rem;
	font-size: 1.25rem;
	color: white;
`;
const Highlighter = styled.div`
	background-color: #98c1d9;
	border-radius: 5px 0 0 5px;
`;
const ModeSwitcher = () => {
	return (
		<SwitchContainer>
			<Highlighter>
				<Options>Sorting</Options>
			</Highlighter>
			<Options>Pathfinding</Options>
		</SwitchContainer>
	);
};

export default ModeSwitcher;
