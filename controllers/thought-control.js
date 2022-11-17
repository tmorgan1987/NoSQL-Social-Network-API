const { Thought } = require('../models');

module.exports = {
	//get all thoughts
	getAllThoughts(req, res) {
		console.log(Thought);
		Thought.find()
		.then((thought) => res.json(thought))
		.catch((err) => {
		console.log(err);
		res.status(500).json(err);
	}
	)
	},
	//get one thought
	getOneThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId})
		.select('-__V')
		.then((thought) =>
		! thought
		? res.status(404).json({ message: "No thought with that ID."})
		: res.json(thought)
		)
		.catch((err) => res.status(500).json(err));
	},
	//create a thought
	newThought(req, res) {
		Thought.create(req.body)
		.then((thought) => res.json(thought))
		.catch((err) => {
			console.log(err);
			return res.status(500).json(err);
		});
	},
	//delete a thought
	deleteThought(req, res) {
		Thought.deleteOne({ _id: req.params.thoughtId})
		.select('-__V')
		.then((thought) =>
		! thought
		? res.status(404).json({ message: "No thought with that ID."})
		: res.json(thought)
		)
		.catch((err) => res.status(500).json(err));
	},
	//update a thought
	updateThought(req,res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
		.then((thought) =>
		! thought
		? res.status(404).json({ message: "No thought with this ID!"})
		: res.json(thought)
		)
	},
};	