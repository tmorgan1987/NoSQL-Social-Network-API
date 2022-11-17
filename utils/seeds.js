const connection = require("../config/connection");
const thoughtSeeds = require("./thoughtSeeds");
const userSeeds = require("./userSeeds");


connection.on('err', (err) => err);

connection.once('open', async () => {
	console.log("Seeding users.");
	await userSeeds();
	console.log("Seeding thoughts.");
	await thoughtSeeds();

	process.exit(0);
});