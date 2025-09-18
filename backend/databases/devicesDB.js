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
const create = async (newDevice, quantity = 1) => {
	console.log(`${debugTag} Inserting multiple devices in database...`);
	let query = `INSERT INTO devices (category, infos) VALUES `;
	for (let i = 0; i < quantity; i++) {
		query += `('${newDevice.category}', '${newDevice.infos}')`;
		if (i < quantity - 1) query += ', ';
		else query += ';';
	}
	const pool = await connectDB();
	const result = await pool.query(query);
	console.log(result.rowCount);
	pool.end();
	return result.rowCount;
}

const retrieve = async () => {
	console.log(`${debugTag} Fetching all devices...`);
	const pool = await connectDB();
	const result = await pool.query('SELECT * FROM devices;');
	pool.end();
	return result.rows;
};

const updateOne = async (id, deviceData) => {
	console.log(`${debugTag} Updating device with ID: ${id}...`);
	const pool = await connectDB();
	const result = await pool.query(
		`UPDATE devices SET category = $1, is_affected = $2, data = $3::json WHERE id = $4::uuid;`,
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

const deleteOne = async (id) => {
	console.log(`${debugTag} Deleting device with ID: ${id}...`);
	const pool = await connectDB();
	const result = await pool.query('DELETE FROM devices WHERE id = $1::uuid;', [
		id,
	]);
	console.log(result.rowCount);
	pool.end();
	return result.rowCount;
};

export default {
	create,
	retrieve,
	updateOne,
	deleteOne,
};
