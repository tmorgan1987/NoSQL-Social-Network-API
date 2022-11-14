const { Thought, User } = require('../models');

// find all thoughts
const thoughtControls = {
	getAllThoughts(req, res) {
		Thought.find()
		.sort({ createdAt: -1})
		.then((thoughtData) => {
			res.json(thoughtData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		}) 
	},

	//find one thoughts
	getOneThought (req, res) {
		Thought.findOne({ _id: req.params.thoughtId})
		.then((thoughtData) => {
			if (!thoughtData) {
				return res.status(404).json({ message: "That thought does not exist."})
			}
			res.json(thoughtData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		})
	},

	newThought (req, res) {
		Thought.create(req.body)
		.then((thoughtData) => {
			return User.findOneAndUpdate (
				{ _id: req.body.userId },
				{ $push: { thoughts: thoughtData._id }},
				{ new: true},
			);
		})
		.then((userData => {
			if (!userData) {
				return res.status(404).json({ message: "There is not a user to give this thought to."});
			}
			res.json({ message: "The thought has been created and attributed to a user."});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		}));
	},

	// update a thought
	updateThought (req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true },
			{ new: true},
		)
		.then((thoughtData) => {
			if (!thoughtData) {
				return res.status(404).json({ message: "That thought does not exist."});
			}
			res.json(thoughtData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		}); 
	},

	//delete a thought
	deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "That user does not exist." });
        }
      })
      .then(() => {
        res.json({ message: "Thought deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

	//add thought reaction
	addReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId},
			{ $addToSet: {reactions: req.body} },
			{ runValidators: true },
			{ new: true },
		)
		.then((thoughtData) => {
			if (!thoughtData) {
				return res.status(404).json({ message: "There is not a thought with this ID."});
			}
			res.json(thoughtData);
		})
		.catch((err => {
			console.log(err)
			res.status(500).json(err);
		}));
	},

	//remove thought reactions
	removeReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId }}},
			{ runValidators: true},
			{ new: true},
		)
		.then((thoughtData) => {
			if (!thoughtData) {
				return res.status(404).json({ message: "There is not a thought with this ID."});
			}
			res.json(thoughtData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
	},
};

module.exports = thoughtControls;