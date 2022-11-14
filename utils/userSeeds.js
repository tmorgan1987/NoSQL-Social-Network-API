const { user } = require('../models');

const userSeeds = [
	{
		username: "EnjoyerOfSeeds",
		email: "enjoyer@seeds.com",
	},
	{
		username: "HaterOfSeeds",
		email: "hater@seeds.com",
	},
	{
		username: "SeedRealist",
		email: "realist@seeds.com"
	},
];

const userSeeding = async () => {
	await user.deleteMany({});
	await user.insertMany(userSeeds);
};

module.exports = userSeeding;