import express from 'express';

const debugTag = '[SERVER]';
console.log(`${debugTag} Server is starting...`);

const port = 3001;
const app = express();

app.listen(port, () =>
	console.log(`${debugTag} Server is running on port ${port}...`)
);

app.get('/', (req, res) => {
	res.send('Hello, World!');
});
