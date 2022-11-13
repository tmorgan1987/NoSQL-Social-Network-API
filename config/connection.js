// done
const mongoose = require("mongoose");

// apparently I need a heroku application to connect to.
//actually, on second thought it appears it runs locally if I don't set up a heroku.
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia_db', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

module.exports = mongoose.connection;