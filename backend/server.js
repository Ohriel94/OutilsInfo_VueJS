import express from 'express';
import bodyParser from 'body-parser';
import devicesDM from './domains/devicesDM.js';
import usersDM from './domains/usersDM.js';

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

//#region Devices Routes
app.get('/devices', async (req, res) => {
	const devices = await devicesDM.retrieveDevices();
	if (!devices) {
		res.status(500).json('Error fetching devices.');
	}
	res.status(200).json(devices);
});

app.get('/devices/:id', async (req, res) => {
	const id = req.params.id;
	const devices = await devicesDM.retrieveDevices();
	devices.map((device) => {
		if (device.pk === id) res.status(200).json(device);
	});
	res.status(404).json(`${id} not found.`);
});

app.post('/devices', async (req, res) => {
	const { category, brand, model, quantity = 1 } = req.body;
	const result = await devicesDM.createDevices(category, brand, model, quantity);
	result > 0 
		? res.status(201).json(`Added ${result} devices to the database.`) 
		: res.status(500).json('Error adding device.');
});

app.put('/devices/:id', async (req, res) => {
	const id = req.params.id;
	const info = req.body;
	const result = await devicesDM.updateDevice(id, info);
	res.status(200).json(`${id} has been updated...`);
});

app.delete('/devices/:id', async (req, res) => {
	const id = req.params.id;
	const result = await devicesDM.deleteDevice(id);
	if (result > 0) res.status(200).json(`${id} successfully deleted...`);
	else res.status(404).json(`${id} not found.`);
});
//#endregion 

//#region Users Routes
app.get('/users', async (req, res) => {
	const users = await usersDM.retrieveUsers();
	if (!users) {
		res.status(50).json('Error fetching users.');
	} else res.status(200).json(users);
});

app.post('/users', async (req, res) => {
	const { lastName, firstName, email, phone } = req.body;
	try {
		const result = await usersDM.createUser(lastName, firstName, email, phone);
		res.status(201).json(`User ${firstName} ${lastName} added to the database.`);
	} catch (error) {
        console.error(`${debugTag} Error creating user:`, error.detail);
		res.status(500).json('Error adding user.');
	}
});

app.put('/users/:id', async (req, res) => {
	const id = req.params.id;
	const info = req.body;
	const result = await usersDM.updateUser(id, info);
	res.status(200).json(`${id} has been updated...`);
});
//#endregion

// ======================== Error Handling 
process.on('uncaughtException', (err) => {
	console.error('[SERVER] Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
	console.error('[SERVER] Unhandled Rejection:', reason);
});
