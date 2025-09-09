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
	const devices = await devicesDM.retrieveDevices();
	res.status(200).json(devices);
});

app.get('/devices/:id', async (req, res) => {
	const id = req.params.id;
	const device = await devicesDM.retrieveDeviceByID(id);
	res.status(200).json(device);
});

app.post('/devices', async (req, res) => {
	const { category, brand, model, notes } = req.body;
	const result = await devicesDM.createDevices(category, brand, model, notes);
	res.status(201).json(`Added ${result} devices to the database.`);
});

app.put('/devices/:id', async (req, res) => {
	const info = req.body;
	const id = req.params.id;
	const result = await devicesDM.updateDevice(id, info);
	res.status(200).json(`${id} has been updated...`);
});

app.delete('/devices/:id', async (req, res) => {
	const id = req.params.id;
	const result = await devicesDM.deleteDevice(id);
	console.log(result);
	res.status(200).json(`${id} has been deleted...`);
});

// ...existing code...

process.on('uncaughtException', (err) => {
	console.error('[SERVER] Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
	console.error('[SERVER] Unhandled Rejection:', reason);
});
