const { User } = require('../models');

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
	await User.deleteMany({});
	await User.insertMany(userSeeds);
};

module.exports = userSeeding;