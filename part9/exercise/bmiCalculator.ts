/*
interface InputValues {
	height: number;
	weight: number;
}

const parseArguments = (args: Array<string>): InputValues => {
	if (args.length < 4) throw new Error('not enough arguments');
	if (args.length > 4) throw new Error('too many arguments');

	if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
		throw new Error('arguments both need to be numbers')
	}

	return {
		height: Number(args[2]),
		weight: Number(args[3])
	}
}

try {
	const { height, weight } = parseArguments(process.argv);
	console.log(calculate(height, weight))
} catch (err) {
	console.log('Something went wrong: ', err.message)
}
*/

const calculate = (height: number, weight: number): string => {
	const bmi = weight / Math.pow(height/100, 2);
	if (bmi < 18.5) return 'Underweight';
	if (bmi > 18.5 && bmi < 25) return 'Healthy weight';
	if (bmi > 25) return 'Overweight';
	else throw new Error('Could not calculate BMI');
};

export const bmiCalculator = (height: number, weight: number) => {
	return calculate(height, weight);
};
