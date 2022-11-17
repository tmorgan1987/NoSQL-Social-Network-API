const { Thought } = require('../models');

const thoughtSeeds =[
	{
		thoughtText: "I truly enjoy creating seeds.",
		created: "11-2-2019",
		username: "EnjoyerOfSeeds",
		reaction: ""
	},
	{
		thoughtText: "I do not like making seeds.",
		created: "11-2-2019",
		username: "HaterOfSeeds",
		reaction: ""
	},
	{
		thoughtText: "Seeds are necessary, but I'm tired of making them.",
		created: "11-2-2019",
		username: "SeedRealist",
		reaction: ""
	},
];

const thoughtSeeding = async () => {
	// await Thought.deleteMany({});
	await Thought.insertMany({thoughtSeeds});
};

module.exports = thoughtSeeding;