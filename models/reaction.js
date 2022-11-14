// done
const { Schema, model, Types } = require("mongoose");

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
			get: date => {
				const todayDate = new Date(date);
				return `${todayDate.getMonth()+1}-${todayDate.getDate()}-${todayDate.getFullYear()}`
			}
		}
	},
	{
		toJSON: {
			getters: true,
		},
			id: false,
	}
);

module.exports = reactSchema;