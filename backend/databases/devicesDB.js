import { Pool } from 'pg';

const debugTag = '[DB_DEVICES]';
console.log(`${debugTag} Initializing devices database connection...`);

// Database connection configuration
const connectionInfos = {
	host: 'localhost',
	database: 'oivjs',
	user: 'oivjs-user',
	password: 'oivjs1234!',
	port: 5432,
};

const connectDB = async () => {
	const pool = new Pool(connectionInfos);
	return pool;
};
// Connect to the database
// client.connect();
// .then(() =>
// 	console.log(`${debugTag} Successfully connected to the database.`)
// )
// .catch((error) =>
// 	console.error(`${debugTag} Error connecting to the database:`, error)
// );

// Function to create one or multiple devices
const createOne = async (device) => {
	console.log(`${debugTag} Inserting new device in database...`);
	const pool = await connectDB();
	const result = await pool.query(
		`INSERT INTO devices (pk, category, is_affected, infos) VALUES (DEFAULT, $1, DEFAULT, $2::json);`,
		[device.category, JSON.stringify(device.data)]
	);
	console.log(result.rowCount);
	pool.end();
	return result.rowCount;
};

const retrieveAll = async (query) => {
	console.log(`${debugTag} Fetching all devices...`);
	const pool = await connectDB();
	const result = await pool.query('SELECT * FROM devices;');
	pool.end();
	return result.rows;
};

const retrieveOneById = async (id) => {
	console.log(`${debugTag} Fetching device with ID: ${id}...`);
	const pool = await connectDB();
	const result = await pool.query('SELECT * FROM devices WHERE pk = $1;', [
		id,
	]);
	if (result.rows.length === 0) {
		console.warn(`${debugTag} No device found with ID: ${id}`);
		return null;
	}
	pool.end();
	return result.rows;
};

const retrieveByType = async (type) => {
	console.log(`${debugTag} Fetching devices of type: ${type}...`);
	return true;
};

const updateOneById = async (id, deviceData) => {
	console.log(`${debugTag} Updating device with ID: ${id}...`);
	const pool = await connectDB();
	const result = await pool.query(
		`UPDATE devices SET category = $1, is_affected = $2, data = $3::json WHERE pk = $4::uuid;`,
		[
			deviceData.category,
			deviceData.is_affected,
			JSON.stringify(deviceData.data),
			id,
		]
	);
	console.log(result.rowCount);
	pool.end();
	return result.rowCount;
};

const deleteOneById = async (id) => {
	console.log(`${debugTag} Deleting device with ID: ${id}...`);
	const pool = await connectDB();
	const result = await pool.query('DELETE FROM devices WHERE pk = $1::uuid;', [
		id,
	]);
	console.log(result.rowCount);
	pool.end();
	return result.rowCount;
};

export default {
	createOne,
	retrieveAll,
	retrieveByType,
	retrieveOneById,
	updateOneById,
	deleteOneById,
};
