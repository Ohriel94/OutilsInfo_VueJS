import express from 'express';
import bodyParser from 'body-parser';
import devicesDM from './domains/devicesDM.js';

const debugTag = '[SERVER]';
console.log(`${debugTag} Server is starting...`);

const app = express();
const port = 9091;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () =>
	console.log(`${debugTag} Server is running on port ${port}...`)
);

app.get('/', (req, res) => {
	res.json({ info: 'OutilsInfo_VueJS Backend is running.' });
});

app.get('/devices', async (req, res) => {
	let devices;
	devices = await devicesDM.retrieveDevices();
	res.status(200).json(devices);
});
