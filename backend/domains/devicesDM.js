// This module provides functions to manage devices in the system, including creating, retrieving, updating, and deleting devices.
// It interacts with the database layer to perform these operations and includes error handling and logging for debugging purposes.

import db from '../databases/devicesDB.js';

const debugTag = '[DM_DEVICES]';

const createDevices = async (category, brand, model,quantity) => {
	console.log(`${debugTag} Creating a new device...`);
	let newDevice = {
		category: category,
		infos: JSON.stringify({ brand, model }),
	};
	try {
		const result = await db.create(newDevice, quantity);
		result
			? console.log(`${debugTag} Devices successfully created.`)
			: console.log(`${debugTag} No devices were created.`);
		return result;
	} catch (error) {
		console.error(`${debugTag} Error creating device:`, error);
		throw error;
	}
};

const retrieveDevices = async () => {
	console.log(`${debugTag} Demanding all devices from DB...`);
	try {
		const devices = await db.retrieve();
		return devices;
	} catch (error) {
		console.error(`${debugTag} Error fetching devices:`, error);
		throw error;
	}
};

const updateDevice = async (id, deviceData) => {
	console.log(`${debugTag} Updating device with ID: ${id}...`);
	try {
		const updatedDevice = await db.updateOneById(id, deviceData);
		return updatedDevice;
	} catch (error) {
		console.error(`${debugTag} Error updating device with ID ${id}:`, error);
		throw error;
	}
};

const deleteDevice = async (id) => {
	console.log(`${debugTag} Deleting device with ID: ${id}...`);
	try {
		const result = await db.deleteOne(id);
		if (result) {
			console.log(`${debugTag} Successfully deleted device with ID: ${id}`);
		} else {
			console.warn(`${debugTag} Device with ID ${id} not found.`);
		}
		return result;
	} catch (error) {
		console.error(`${debugTag} Error deleting device with ID ${id}:`, error);
		throw error;
	}
};

export default {
	createDevices,
	retrieveDevices,
	updateDevice,
	deleteDevice,
};
