const mongoose = require('../services/mongoose');;
const Schema = mongoose.Schema;
const config = require('../config');
const ObjectId = Schema.ObjectId;

const LotsSchema = mongoose.Schema({
	title: String,
	listId: String,
	price: String,
	condition: ObjectId
});

LotsSchema.methods.entitize = function() {
	return {
		id: this._id,
		title: this.title,
		listId: this.listId,
		price: this.price,
		condition: this.condition
	};
};

LotsSchema.statics.getByListId = function(id, conditionId) {
	return this.findOne({listId: id, condition: conditionId}).then((item) => {
		return item;
	}).catch((err) => {});
}

LotsSchema.statics.getById = function(id) {
	return this.findById(id)
		.then((item) => {
			return item;
		})
		.catch((err) => {});
};

LotsSchema.methods.saveAsync = function() {
	return new Promise((resolve,reject) => {
		this.save((err) => {
			if (err) return reject(err);
			resolve();
		})
	})
};

const lots = mongoose.model('Lot', LotsSchema);
module.exports = lots;