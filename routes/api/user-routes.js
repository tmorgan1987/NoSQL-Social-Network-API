const router = require("express").Router();
const {
	getAllUsers,
	getOneUser,
	newUser,
	updateUser,
	deleteUser,
	addFriend,
	unfriend,
} = require("../../controllers/user-control");

router.route("/").get(getAllUsers).post(newUser);

router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(unfriend);

module.exports = router;