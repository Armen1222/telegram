let config = {
	projectName: "listam",
	listeningPort: 3003,
	mongoDB: {
		host: "mongodb://localhost",
			port: 27017,
			// port: 3979,
			database: "list_notifier"
	}
};

module.exports = config;