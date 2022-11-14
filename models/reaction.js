// done
const { Schema, model, Types } = require("mongoose");
const date = require("../utils/dateFormatting");

const reactSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactBody: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		created: {
			type: Date,
			default: Date.now,
			get: (timestamp) => date(timestamp),
		},
	},
	{
		toJSON: {
			getters: true,
		},
			id: false,
	}
);

module.exports = reactSchema;