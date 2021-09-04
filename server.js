const config = {
	port: process.env.port || 3000,
	db: process.env.db || './db.json',
};

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(config.db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(config.port, () => {
	console.log(
		`JSON Server is running version ${process.env.SERVER_VERSION} on port`,
		config.port
	);
});
