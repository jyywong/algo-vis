import React from 'react';
import styled from 'styled-components';
import { motion, AnimateSharedLayout } from 'framer-motion';

const SwitchContainer = styled(motion.div)`
	margin-left: auto;
	background-color: #293241;
	border-radius: 10px;

	display: flex;
	align-items: center;
`;
const SubContainer = styled.div`
	position: relative;
	margin: 0 1rem;
	cursor: pointer;
`;
const Options = styled.h4`
	margin: .75rem;
	font-size: 1.25rem;
	color: white;
`;
const Highlighter = styled(motion.div)`
	border-radius: 10px;
	position: absolute;
	top: -5%;
	left: -5%;
	right: -5%;
	bottom: -5%;
	border: 3px solid #98c1d9;
`;
const ModeSwitcher = ({ mode, setMode }) => {
	return (
		<SwitchContainer layout>
			<AnimateSharedLayout>
				<SubContainer
					onClick={() => {
						setMode('sort');
					}}
				>
					<Options>
						Sorting
						{mode === 'sort' && <Highlighter layoutId="highlight" />}
					</Options>
				</SubContainer>

				<SubContainer
					onClick={() => {
						setMode('path');
					}}
				>
					<Options>Pathfinding</Options>
					{mode === 'path' && <Highlighter layoutId="highlight" />}
				</SubContainer>
			</AnimateSharedLayout>
		</SwitchContainer>
	);
};

export default ModeSwitcher;
