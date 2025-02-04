import postgres from 'postgres';
const connectionString =
	'postgresql://oivjs-user:oivjs-pass123!@localhost:5432/oivjs-db';
const psql = postgres(connectionString);

const getAll = async () => {
	const devices = await psql`select * from devices`;
	return devices;
};

export default { getAll };
