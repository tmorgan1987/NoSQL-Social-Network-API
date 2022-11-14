//done
const { Schema, model } = require("mongoose");
const reactSchema = require('./reaction');

const thoughtSchema = new Schema (
{
	thoughtText: {
		type: String,
		required: "Please leave a thought.",
		minlength: 1,
	},
	created: {
		type: Date,
		default: Date.now,
		get: date => {
			const todayDate = new Date(date);
			return `${todayDate.getMonth()+1}-${todayDate.getDate()}-${todayDate.getFullYear()}`
		}
	},
	username: {
		type: String,
		required: true,
	},
	reactions: [reactSchema],
},
{
	toJSON: {
		getters: true,
},
		id: false,
}
);

thoughtSchema.virtual("reactCount").get(function () {
	return this.reactions.length;
});

const thought = model("thought", thoughtSchema);
module.exports = thought;