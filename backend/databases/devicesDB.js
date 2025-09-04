import { Pool } from 'pg';

const debugTag = '[DB_DEVICES]';
console.log(`${debugTag} Initializing devices database connection...`);
// Database connection configuration
const pool = new Pool({
	host: 'localhost',
	database: 'oivjs',
	user: 'oivjs-user',
	password: 'oivjs1234!',
	port: 5432,
});

// Connect to the database
// client.connect();
// .then(() =>
// 	console.log(`${debugTag} Successfully connected to the database.`)
// )
// .catch((error) =>
// 	console.error(`${debugTag} Error connecting to the database:`, error)
// );

const retrieveAll = async (query) => {
	console.log(`${debugTag} Fetching all devices...`);
	const data = await pool.query(query);
	return data.rows;
};

const retrieveByType = async (type) => {
	console.log(`${debugTag} Fetching devices of type: ${type}...`);
	return true;
};

const retrieveOneById = async (id) => {
	console.log(`${debugTag} Fetching device with ID: ${id}...`);
	return true;
};

// Function to create one or multiple devices
const createMany = async (devices) => {
	console.log(`${debugTag} Creating new devices...`);
	return true;
};

const updateOneById = async (id, deviceData) => {
	console.log(`${debugTag} Updating device with ID: ${id}...`);
	return true;
};

const deleteOneById = async (id) => {
	console.log(`${debugTag} Deleting device with ID: ${id}...`);
	return true;
};

export default {
	createMany,
	retrieveAll,
	retrieveByType,
	retrieveOneById,
	updateOneById,
	deleteOneById,
};
