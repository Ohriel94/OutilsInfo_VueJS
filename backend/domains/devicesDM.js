// This module provides functions to manage devices in the system, including creating, retrieving, updating, and deleting devices.
// It interacts with the database layer to perform these operations and includes error handling and logging for debugging purposes.

import db from '../databases/devicesDB.js';

const debugTag = '[DM_DEVICES]';

const retrieveDevices = async () => {
	console.log(`${debugTag} Demanding all devices from DB...`);
	try {
		const devices = await db.retrieveAll();
		return devices;
	} catch (error) {
		console.error(`${debugTag} Error fetching devices:`, error);
		throw error;
	}
};

const retrieveDeviceByID = async (id) => {
	console.log(`${debugTag} Fetching device with ID: ${id}...`);
	try {
		const device = await db.retrieveOneById(id);
		if (!device) {
			console.warn(`${debugTag} Device with ID ${id} not found.`);
			return null;
		}
		console.log(`${debugTag} Successfully fetched device:`, device.length);
		return device;
	} catch (error) {
		console.error(`${debugTag} Error fetching device by ID:`, error);
		throw error;
	}
};

const retrieveDeviceByType = async (type) => {
	console.log(`${debugTag} Fetching devices of type: ${type}...`);
	try {
		const devices = await db.retrieveByType(type);
		if (devices.length === 0) {
			console.warn(`${debugTag} No devices found of type: ${type}`);
			return [];
		}
		console.log(
			`${debugTag} Successfully fetched ${devices.length} devices of type ${type}.`
		);
		return devices;
	} catch (error) {
		console.error(`${debugTag} Error fetching devices by type:`, error);
		throw error;
	}
};

const createDevices = async (category, brand, model, notes) => {
	console.log(`${debugTag} Creating a new device...`);
	let newDevices = {
		category: category,
		data: { brand, model, notes },
	};
	newDevices.data = JSON.stringify(newDevices.data);
	console.log(newDevices.data);
	try {
		const result = await db.createOne(newDevices);
		result
			? console.log(`${debugTag} Devices successfully created.`)
			: console.log(`${debugTag} No devices were created.`);
		return result;
	} catch (error) {
		console.error(`${debugTag} Error creating device:`, error);
		throw error;
	}
};

const updateDevice = async (id, deviceData) => {
	console.log(`${debugTag} Updating device with ID: ${id}...`);
	try {
		const updatedDevice = await db.update(id, deviceData);
		return updatedDevice;
	} catch (error) {
		console.error(`${debugTag} Error updating device with ID ${id}:`, error);
		throw error;
	}
};

const deleteDevice = async (id) => {
	console.log(`${debugTag} Deleting device with ID: ${id}...`);
	try {
		const result = await db.delete(id);
		if (result) {
			console.log(`${debugTag} Successfully deleted device with ID: ${id}`);
			return true;
		} else {
			console.warn(`${debugTag} Device with ID ${id} not found.`);
			return false;
		}
	} catch (error) {
		console.error(`${debugTag} Error deleting device with ID ${id}:`, error);
		throw error;
	}
};

export default {
	retrieveDevices,
	retrieveDeviceByID,
	retrieveDeviceByType,
	createDevices,
	updateDevice,
	deleteDevice,
};
