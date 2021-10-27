import React from 'react';
import styled from 'styled-components';
import ModeSwitcher from './ModeSwitcher';

const Bar = styled.div`
	box-sizing: border-box;
	width: 100%;
	flex-basis: 8%;
	background-color: #293241;
	padding: 0 2rem;

	display: flex;
	align-items: center;
`;
const Logo = styled.h1`
	font-size: 3rem;
	color: #ee6c4d;
`;

const TopBar = ({ mode, setMode }) => {
	return (
		<Bar>
			<Logo>AlgoVis</Logo>
			<ModeSwitcher mode={mode} setMode={setMode} />
		</Bar>
	);
};

export default TopBar;
