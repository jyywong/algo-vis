import React, { useState } from 'react';
import styled from 'styled-components';
import BottomBar from './Components/BottomBar';
import TopBar from './Components/TopBar';
import VisContainer from './Components/VisContainer';
import GlobalStyle from './globalStyles';

const AppContainer = styled.div`
	margin: 0;
	padding: 0;
	background-color: #3d5a80;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

function App() {
	const [ arraySize, setArraySize ] = useState(10);
	const [ sortAlgo, setSortAlgo ] = useState('Merge');
	return (
		<React.Fragment>
			<GlobalStyle />
			<AppContainer>
				<TopBar />
				<VisContainer arraySize={arraySize} sortAlgo={sortAlgo} />
				<BottomBar
					arraySize={arraySize}
					setArraySize={setArraySize}
					sortAlgo={sortAlgo}
					setSortAlgo={setSortAlgo}
				/>
			</AppContainer>
		</React.Fragment>
	);
}

export default App;
