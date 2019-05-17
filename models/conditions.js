const mongoose = require('../services/mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

const ConditionsSchema = mongoose.Schema({
	name: { type: String },
	conditions: { type: String }
});

ConditionsSchema.methods.entitize = function() {
	return {
		id: this._id,
		name: this.name,
		conditions: this.conditions
	};
};


ConditionsSchema.statics.getById = function(id) {
	return this.findById(id)
		.then((item) => {
			return item;
		})
		.catch((err) => {});
};

ConditionsSchema.methods.saveAsync = function() {
	return new Promise((resolve,reject) => {
		this.save((err) => {
			if (err) return reject(err);
			resolve();
		})
	})
};

const conditions = mongoose.model('Condition', ConditionsSchema);
module.exports = conditions;