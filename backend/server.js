import express from 'express';
import devicesDM from './domain/devicesDM.js';

console.log('server starting');
const app = express();
app.listen(3001);
console.log('server started');

app.get('/', (req, res) => {
	res.send(200);
});

app.get('/devices', async (req, res) => {
	console.log('get/devices');
	const result = await devicesDM.retrieveDevices();
	res.send(result);
});
