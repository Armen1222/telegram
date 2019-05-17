const mongoose = require('../services/mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

const BotSchema = mongoose.Schema({
	chatId: { type: Number }
});

BotSchema.methods.entitize = function() {
	return {
		id: this._id,
		chatId: this.chatId
	};
};

BotSchema.statics.getByChatId = function(id) {
	return this.find({chatId: id})
		.then((item) => {
			return item;
		})
		.catch((err) => {});
};

BotSchema.statics.getById = function(id) {
	return this.findById(id)
		.then((item) => {
			return item;
		})
		.catch((err) => {});
};

BotSchema.methods.saveAsync = function() {
	return new Promise((resolve,reject) => {
		this.save((err) => {
			if (err) return reject(err);
			resolve();
		})
	})
};

const bot = mongoose.model('Bot', BotSchema);
module.exports = bot;