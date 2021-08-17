import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
	res.send('<p>Hello Full Stack!</p>');
});

app.get('/bmi', (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);
	if (isNaN(height) || isNaN(weight))
		throw new Error('Height and weight parameters need to be numbers');
	const result = bmiCalculator(height, weight);
	res.json({ 
		weight: weight,
		height: height,
		bmi: result
	});
});

app.post('/exercises', (req, res) => {
	const days:Array<number> = req.body.daily_exercises;
	const target:number = req.body.target;
	days.forEach(d => {
		if (isNaN(d)) throw new Error('Daily exercises array may only contain numbers');
	});
	if (isNaN(target)) throw new Error('Target needs to be number');
	res.json(exerciseCalculator(days, target));
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
