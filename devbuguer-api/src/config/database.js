const pgHost = process.env.PG_HOST
const pgPassword = process.env.PG_PASSWORD
const pgDataBase = process.env.PG_DATABASE
const pgUsername = process.env.PG_USERNAME
const pgPort = process.env.PG_PORT

module.exports = {
	dialect: 'postgres',
	host: pgHost,
	port: pgPort,
	username: pgUsername,
	password: pgPassword,
	database: pgDataBase,

	define: {
		timestemps: true,
		underscored: true,
		underscoredAll: true,
	},
}
