const { thought } = require('../models');

const thoughtSeeds =[
	{
		thoughtText: "I truly enjoy creating seeds.",
		username: "EnjoyerOfSeeds",
	},
	{
		thoughtText: "I do not like making seeds.",
		username: "HaterOfSeeds",
	},
	{
		thoughtText: "Seeds are necessary, but I'm tired of making them.",
		username: "SeedRealist",
	},
];

const thoughtSeeding = async () => {
	await thought.deleteMany({});
	await thought.insertMany({thoughtSeeds});
};

module.exports = thoughtSeeding;