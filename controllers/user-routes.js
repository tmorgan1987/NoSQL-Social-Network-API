const { user, thought } = require('../models');

// let's get all users
const userRoutes = {
	getAllUsers(req, res) {
		user.find()
		.select("-__v")
		.then((userData) => {
			res.json(userData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
	},

	// let's get one user
	getOneUser(req, res) {
		user.findOne({ _id: req.params.userId})
		.select("-__v")
		.populate("friends")
		.populate("thoughts")
		.then((userData) => {
			if (!userData) {
				return res.status(404).json({ message: 'There is not a user with this ID.' });
			}
			res.json(userData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
	},

	// create a user
	newUser(req, res) {
		user.create(req.body)
		.then((userData) => {
			res.json(userData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		})
	},

	// update user
	updateUser(req, res) {
		user.findOneAndUpdate(
			{ _id: req.params.userId},
			{
				$set: req.body,
			},
			{
				runValidators: true,
				new: true,
			}
		)
		.then((userData) => {
			if (!userData) {
				return res.status(404).json({ message:'There is not a user with this ID.'});
			}
			res.json(userData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
	},

	//delete user
	deleteUser(req, res) {
    user.findOneAndDelete({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "That user does not exist." });
        }
      })
      .then(() => {
        res.json({ message: "User deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

	//add a friend
	addFriend(req, res) {
		user.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.params.friendId }},
			{ new: true},
			)
			.then((userData) => {
				if (!userData) {
					return res.status(404).json({ message: "That user does not exist." });
				}
				res.json(userData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	//unfriend a friend
	unfriend(req, res) {
		user.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: {friends: req.params.friendId} },
			{ new: true},
		)
		.then((userData => {
			if (!userData) {
				return res.status(404).json({ message: "That user ID does not exist." });
			}
			res.json(userData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		})
	)},
};

module.exports = userRoutes;