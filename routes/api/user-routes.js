const router = require("express").Router();
const {
	getAllUsers,
	getOneUser,
	newUser,
	deleteUser,
	updateUser,

} = require("../../controllers/user-control");

router.route("/").get(getAllUsers).post(newUser);

router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;