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
	height: 1.5rem;
	width: 1.5rem;
`;
const StyledName = styled.p`
	font-size: 1.5rem;
	color: white;
	font-weight: 500;
	margin-left: .5rem;
`;
const SortLegend = ({ sortAlgo }) => {
	return (
		<LegendContainer>
			{(() => {
				if (sortAlgo === 'Merge') {
					return (
						<PairContainer>
							<LegendBox bgcolor="rgb(255, 255, 255, 0.5)" />
							<StyledName> Section being merged</StyledName>
						</PairContainer>
					);
				} else if (sortAlgo === 'Quick') {
					return (
						<PairContainer>
							<LegendBox bgcolor="orange" />
							<StyledName> Pivot point</StyledName>
						</PairContainer>
					);
				} else {
					return (
						<PairContainer>
							<LegendBox bgcolor="green" />
							<StyledName> Values being compared</StyledName>
						</PairContainer>
					);
				}
			})()}
		</LegendContainer>
	);
};

export default SortLegend;
