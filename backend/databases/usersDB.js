import util from './utilities.js';
import { Pool } from 'pg';

const debugTag = '[DB_USERS]';
console.log(`${debugTag} Initializing users database connection...`);

const connectDB = async () => {
	const pool = new Pool(util.connectionInfos);
	return pool;
};

const create = async (lastName, firstName, email, phone = "") => {
	console.log(`${debugTag} Inserting a new user in database...`);
	const pool = await connectDB();
	try {
		const result = await pool.query(`INSERT INTO users (last_name, first_name, email, phone) VALUES
		('${lastName}', '${firstName}', '${email}', '${phone}');`);
		pool.end();
		return result.rowCount;
	} catch (error) {
		throw error;
	}
};

const retrieve = async () => {
	console.log(`${debugTag} Fetching all users...`);
	const pool = await connectDB();
	const result = await pool.query('SELECT * FROM users;');
	pool.end();
	return result.rows;
};

const updateOne = async (id, info) => {
	console.log(`${debugTag} Updating user ${id}...`);
	const pool = await connectDB();
	const result = await pool.query(`UPDATE users SET last_name = $1, first_name = $2, email = $3, phone = $4 WHERE id = $5;`,
		[
			info.last_name,
			info.first_name,
			info.email,
			info.phone,
			id
		]);
	console.log(result.rowCount);
	pool.end();
	return result.rowCount;
};

export default {
	create,
	retrieve,
	updateOne
};
