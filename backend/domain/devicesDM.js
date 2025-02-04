import devicesDB from '../database/devicesDB.js';

const retrieveDevices = async () => {
	const devices = await devicesDB.getAll();
	devices.forEach((device) => {
		delete device.id;
		delete device.notes;
	});
	return devices;
};

export default { retrieveDevices };
