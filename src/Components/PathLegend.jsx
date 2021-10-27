import React from 'react';
import styled from 'styled-components';

const LegendContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-top: .75rem;
`;

const PairContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin: 0 1rem;
`;

const LegendBox = styled.div`
	background-color: ${(props) => props.bgcolor};
	border: 1px solid black;
	height: 1rem;
	width: 1rem;
`;
const StyledName = styled.p`
	font-size: 1rem;
	color: white;
	font-weight: 500;
	margin-left: .5rem;
`;

const PathLegend = () => {
	return (
		<LegendContainer>
			<PairContainer>
				<LegendBox bgcolor="#4d8138" />
				<StyledName>Start</StyledName>
			</PairContainer>
			<PairContainer>
				<LegendBox bgcolor="#813838" />
				<StyledName>End</StyledName>
			</PairContainer>
			<PairContainer>
				<LegendBox bgcolor="black" />
				<StyledName>Walls</StyledName>
			</PairContainer>
			<PairContainer>
				<LegendBox bgcolor="#6a0dad49" />
				<StyledName>Visited Nodes</StyledName>
			</PairContainer>
			<PairContainer>
				<LegendBox bgcolor="yellow" />
				<StyledName>Final Path</StyledName>
			</PairContainer>
		</LegendContainer>
	);
};

export default PathLegend;
