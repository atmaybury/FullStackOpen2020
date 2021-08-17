interface Results {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

/*
const parseArguments = (args: Array<string>): Array<number> => {
	if (args.length < 3) throw new Error('not enough arguments');

	let days: number[] = [];
	for (let i = 2; i < args.length; i++) {
		const hours = Number(args[i]);
		if (isNaN(hours)) throw new Error('All provided arguments need to be numbers');
		days = days.concat(hours);
	}
	return days;
};
*/

const calculate = (days:Array<number>, target:number):Results => {
	const average = days.reduce((a, b) => a + b, 0) / days.length;
	const	rating = average > target 
		? 3
		: average === target 
			? 2 
			: 1;

	return {
		periodLength: days.length,
		trainingDays: days.filter(d => d > 0).length,
		success: average >= target,
		rating: rating,
		ratingDescription: rating === 3 ? 'great' : rating === 2 ? 'fine' : 'do better',
		target: target,
		average: average
	};
};

/*
try {
	const days = parseArguments(process.argv);
	console.log(calculate(days));
} catch (err: unknown) {
	console.log('Something went wrong: ', err.message);
}
*/

export const exerciseCalculator = (days:Array<number>, target:number):Results => {
	return calculate(days, target);
};
