const router = require("express").Router();
const {
	getAllThoughts,
	getOneThought,
	newThought,
	updateThought,
	deleteThought,
} = require ('../../controllers/thought-control');

router.route("/").get(getAllThoughts).post(newThought);

router.route("/:thoughtId").get(getOneThought).put(updateThought).delete(deleteThought);


module.exports = router;