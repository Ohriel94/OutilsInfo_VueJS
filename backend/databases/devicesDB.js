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
	const result = await pool.query('SELECT * FROM devices;');
	return result.rows;
};

const retrieveOneById = async (id) => {
	console.log(`${debugTag} Fetching device with ID: ${id}...`);
	const result = await pool.query('SELECT * FROM devices WHERE id = $1;', [
		id,
	]);
	if (result.rows.length === 0) {
		console.warn(`${debugTag} No device found with ID: ${id}`);
		return null;
	}
	return result.rows;
};

const retrieveByType = async (type) => {
	console.log(`${debugTag} Fetching devices of type: ${type}...`);
	return true;
};

// Function to create one or multiple devices
const createOne = async (device) => {
	console.log(`${debugTag} Inserting new device in database...`);
	const result = await pool.query(
		`INSERT INTO devices (pk, category, is_affected, data) VALUES (DEFAULT,'${device.category}',DEFAULT,'{"brand": "Dell","model": "Vostro 5505","notes": "Voici des notes tres pertinentes"}'::json);`
	);
	return result.rowCount;
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
	retrieveAll,
	retrieveByType,
	createOne,
	retrieveOneById,
	updateOneById,
	deleteOneById,
};
