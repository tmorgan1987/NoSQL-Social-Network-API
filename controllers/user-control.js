const { User, Thought } = require('../models');

module.exports = {
	//get all users
	getAllUsers(req, res) {
		console.log(User);
		User.find()
		.then((userData) => res.json(userData))
		.catch((err) => {
		console.log(err);
		res.status(500).json(err);
	}
	)
	},
	//get one user
	getOneUser(req, res) {
		User.findOne({ _id: req.params.userId})
		.select('-__V')
		.then((user) =>
		! user
		? res.status(404).json({ message: "No user with that ID."})
		: res.json(user)
		)
		.catch((err) => res.status(500).json(err));
	},
	//delete a user and BONUS associated thoughts
	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.userId})
		.select('-__V')
		.then((user) =>
		! user
		? res.status(404).json({ message: "No user with that ID."})
		: Thought.deleteMany({ username: { $in: user.username}})
		)
		.then(() => res.json({ message: "User and associated thoughts deleted!"}))
		.catch((err) => res.status(500).json(err));
	},
	//create a user
	newUser(req, res) {
		User.create(req.body)
		.then((user) => res.json(user))
		.catch((err) => {
			console.log(err);
			return res.status(500).json(err);
		});
	},
	//update a user
	updateUser(req,res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
		.then((user) =>
		! user
		? res.status(404).json({ message: "No user with this ID!"})
		: res.json(user)
		)
	},
}	