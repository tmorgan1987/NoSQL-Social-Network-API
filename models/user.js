// done
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
			match: [/.+@.+\..+/, "Please use an email address."],
		},
		thoughts: [
		{
			type: Schema.Types.ObjectId,
			ref: "thought",
		},
	],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "user",
			},
		],
	},
);

userSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

const user = model("user", userSchema);
module.exports = user;