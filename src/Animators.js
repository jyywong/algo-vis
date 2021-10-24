export const animateBubbleorInsertionNew = (fast, timeouts, svgRef, animationRoll) =>
	animationRoll.reduce(async (previousPromise, frame, index) => {
		const currentAFrame = async (frame) => {
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
					leftComp.transition().attr('fill', 'white').end(),
					rightComp.transition().attr('fill', 'white').end()
				]);
			}

			if (index === animationRoll.length - 1) {
				svgRef.selectAll('.bar').transition().attr('fill', 'green');
			}
		};
		await previousPromise;

		return currentAFrame(frame);
	}, Promise.resolve());

export const animateMergeSortNew = (fast, timeouts, svgRef, arrayOfArrays) => {
	arrayOfArrays.reduce(async (previousPromise, [ sortedArray, arraySection ], index) => {
		const currentAFrame = async (sortedArray, index) => {
			console.log(sortedArray, arraySection, index);
			const opacityPromise = [];
			for (let i = arraySection[0]; i <= arraySection[1]; i++) {
				opacityPromise.push(svgRef.select(`#b${i}`).transition().attr('opacity', '0.5').end());
			}
			await Promise.all(opacityPromise);
			const swapPromise = [];

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
			for (let i = arraySection[0]; i <= arraySection[1]; i++) {
				returnPromise.push(svgRef.select(`#b${i}`).transition().attr('opacity', '1').end());
			}
			await Promise.all(returnPromise);
		};
		await previousPromise;
		return currentAFrame(sortedArray, arraySection, index);
	});
};

export const animateQuickSort = (svgRef, animationInfo) => {
	animationInfo.reduce(async (previousPromise, animationFrame, index) => {
		const { pivotValue, swappers, section, movePivot, actualPivot } = animationFrame;
		const currentAFrame = async (previousResponse) => {
			let previousSection, previousPivot;
			if (typeof previousResponse === 'undefined') {
				previousSection = [];
			} else {
				[ previousSection ] = previousResponse;
			}
			if (typeof previousResponse === 'undefined') {
				previousPivot = 100000;
			} else {
				[ , previousPivot ] = previousResponse;
			}

			// Highlight pivot
			const actualPivotEl = svgRef.select(`[name="${actualPivot}"]`);
			await actualPivotEl.transition().attr('fill', 'orange').end();

			const pivot = svgRef.select(`[name="${pivotValue}"]`);
			await pivot.transition().attr('fill', 'yellow').end();

			const swapA = svgRef.select(`[name="${swappers[0]}"]`);
			const swapB = svgRef.select(`[name="${swappers[1]}"]`);

			if (swappers[0] !== swappers[1]) {
				if (movePivot === false) {
					if (swappers[0] === pivotValue) {
						await swapB.transition().attr('fill', 'red').end();
					} else {
						await swapA.transition().attr('fill', 'red').end();
					}
				}

				await Promise.all([
					swapA.transition().attr('x', swapB.attr('x')).end(),
					swapB.transition().attr('x', swapA.attr('x')).end()
				]);
			}
			if (previousPivot !== actualPivot) {
				await svgRef.select(`[name="${previousPivot}"]`).transition().attr('fill', 'white').end();
			}

			await Promise.all([ pivot.transition().attr('fill', 'white').end() ]);
			if (swappers[0] === pivotValue && swappers[0] !== actualPivot) {
				await swapB.transition().attr('fill', 'white').end();
			} else if (swappers[1] === pivotValue && swappers[1] !== actualPivot) {
				await swapA.transition().attr('fill', 'white').end();
			}

			return [ section, actualPivot ];
		};
		const previousResponse = await previousPromise;
		return currentAFrame(previousResponse);
	}, Promise.resolve());
};
