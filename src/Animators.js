export const animateBubbleorInsertion = (fast, timeouts, svgRef, animationRoll) =>
	animationRoll.forEach((frame, index) => {
		timeouts.current.push(
			setTimeout(async () => {
				console.log('hello');
				const leftComp = svgRef.select(`[name="${frame.comparison[0]}"]`);
				const rightComp = svgRef.select(`[name="${frame.comparison[1]}"]`);

				if (fast) {
					leftComp.attr('fill', 'green');
					rightComp.attr('fill', 'green');
				} else {
					await Promise.all([
						leftComp.transition().attr('fill', 'green').end(),
						rightComp.transition().attr('fill', 'green').end()
					]);
				}

				if (frame.swap) {
					// if (fast) {
					// 	leftComp.attr('fill', 'red');
					// 	rightComp.attr('fill', 'red');
					// } else {
					// 	await Promise.all([
					// 		leftComp.transition().attr('fill', 'red').end(),
					// 		rightComp.transition().attr('fill', 'red').end()
					// 	]);
					// }
					// if (fast) {
					// 	const tempCompX = leftComp.attr('x');
					// 	leftComp.attr('x', rightComp.attr('x'));
					// 	rightComp.attr('x', tempCompX);
					// } else {
					await Promise.all([
						leftComp.transition().attr('x', rightComp.attr('x')).end(),
						rightComp.transition().attr('x', leftComp.attr('x')).end()
					]);
					// }
				}
				if (fast) {
					svgRef.select(`[name="${frame.previous}"]`).attr('fill', 'white');
					leftComp.attr('fill', 'white');
					rightComp.attr('fill', 'white');
				} else {
					await Promise.all([
						svgRef.select(`[name="${frame.previous}"]`).transition().attr('fill', 'white').end(),
						leftComp.transition().duration(250).attr('fill', 'white').end(),
						rightComp.transition().duration(250).attr('fill', 'white').end()
					]);
				}

				if (index === animationRoll.length - 1) {
					svgRef.selectAll('.bar').transition().attr('fill', 'green');
				}
			}, 550 * index)
		);
	});

export const animateMergeSort = (fast, timeouts, svgRef, arrayOfArrays) => {
	arrayOfArrays.forEach(([ sortedArray, arraySection ], index) => {
		timeouts.current.push(
			setTimeout(async () => {
				console.log(sortedArray);
				const opacityPromise = [];
				for (let i = arraySection[0]; i < arraySection[1]; i++) {
					opacityPromise.push(svgRef.select(`#b${i}`).transition().attr('opacity', '0.5').end());
				}
				await Promise.all(opacityPromise);
				const swapPromise = [];

				// const swapOrNot = (value, sortedArrayIndex) => {
				// 	const targetInSorted = value;
				// 	const targetElementInGrand = svgRef.select(`[name="${targetInSorted}"]`);
				// 	const indexInFinal = arraySection[0] + sortedArrayIndex;
				// 	const elementInSpot = svgRef.select(`#b${indexInFinal}`);
				// 	const inSpotValue = Number(elementInSpot.attr('name'));

				// 	console.log(elementInSpot);
				// 	const swaps = [];
				// 	if (inSpotValue !== targetInSorted) {
				// 		// const tempX = targetElementInGrand.attr('x');
				// 		const previousTargetElementIndex = targetElementInGrand.attr('id');
				// 		// const previousElementInSpotIndex = elementInSpot.attr('id')
				// 		targetElementInGrand.attr('id', elementInSpot.attr('id'));
				// 		elementInSpot.attr('id', previousTargetElementIndex);
				// 		swaps.push(targetElementInGrand.transition().attr('x', elementInSpot.attr('x')).end());

				// 		swaps.push(elementInSpot.transition().attr('x', targetElementInGrand.attr('x')).end());
				// 	}
				// 	return Promise.all(swaps);
				// };

				// sortedArray.reduce(async (previousPromise, value, index) => {
				// 	await previousPromise;
				// 	return swapOrNot(value, index);
				// }, Promise.resolve());

				for (let i = 0; i < sortedArray.length; i++) {
					const targetInSorted = sortedArray[i];
					const targetElementInGrand = svgRef.select(`[name="${targetInSorted}"]`);
					const indexInFinal = arraySection[0] + i;
					const elementInSpot = svgRef.select(`#b${indexInFinal}`);
					const inSpotValue = Number(elementInSpot.attr('name'));

					if (inSpotValue !== targetInSorted) {
						// const tempX = targetElementInGrand.attr('x');
						const previousTargetElementIndex = targetElementInGrand.attr('id');
						// const previousElementInSpotIndex = elementInSpot.attr('id')
						// targetElementInGrand.attr('id', elementInSpot.attr('id'));
						// elementInSpot.attr('id', previousTargetElementIndex);
						swapPromise.push(
							targetElementInGrand
								.transition()
								.attr('x', elementInSpot.attr('x'))
								.attr('id', elementInSpot.attr('id'))
								.end()
						);

						swapPromise.push(
							elementInSpot
								.transition()
								.attr('x', targetElementInGrand.attr('x'))
								.attr('id', previousTargetElementIndex)
								.end()
						);
					}
					await Promise.all(swapPromise);
				}

				const returnPromise = [];
				for (let i = arraySection[0]; i < arraySection[1]; i++) {
					returnPromise.push(svgRef.select(`#b${i}`).transition().attr('opacity', '1').end());
				}
				await Promise.all(returnPromise);
			}, 1500 * index)
		);
	});
};
