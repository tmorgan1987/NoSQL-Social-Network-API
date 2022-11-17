//done
const { Schema, model } = require("mongoose");
const reactSchema = require('./reaction');

const thoughtSchema = new Schema (
{
	thoughtText: {
		type: String,
		required: false,
		minlength: 1,
		maxlenght: 255,
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
		required: false,
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

const Thought = model("thought", thoughtSchema);
module.exports = Thought;