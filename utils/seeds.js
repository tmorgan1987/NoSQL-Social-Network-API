const thoughtSeeds = require("./thoughtSeeds");
const userSeeds = require("./userSeeds");
const connection = require("../config/connection");

connection.on('err', (err) => err);

connection.once('open', async () => {
	console.log("Seeding thoughts.");
	await thoughtSeeds();
	console.log("Seeding users.");
	await userSeeds();

	process.exit(0);
});