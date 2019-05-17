const schedule = require('node-schedule');
const conditionsModel = require('../models/conditions');
const lotsModel = require('../models/lots');
const axios = require('axios');
const Notifier = require('../services/telegramNotifier');
const htmlParser = require('../services/htmlParser');
let lastMoiCrugId;
let lastFrealanceId;

let lastID = {'moiCrug' : [],
				'frealance': [] };

class Parser {
	static initialize() {

		var j = schedule.scheduleJob('*/50 * * * * *', async () => {
			try {
				await Parser.runParser();
			} catch (e) {};
		});
	}


	static async runParser() {
		console.log('###');
		let conditions = [{'conditions' : 'https://moikrug.ru/vacancies?q=swift&divisions%5B%5D=frontend&divisions%5B%5D=apps&currency=rur&remote=1&type=all', 'id' : '0'},
		{ 'conditions' : 'https://freelansim.ru/tasks?q=ios', 'id' : '1'}];
		
		for(let condition of conditions) {
			let post;
			axios.get(condition.conditions)
			.then(function (response) {
				post = htmlParser.getPageItems(response.data, condition.id === '0');
			})
			.catch((error) => {
				console.log(error);
			}).then(async () => {
				if (condition.id == '1') {
					if(lastID.frealance.length === 0) {
						lastID.frealance = post;
						for (const item of post) {
							if (item === post[post.length-1]) {
								await Notifier.notifyUsers(
									`https://freelansim.ru/tasks/${item}`
								);
							}
						}
					} else {
						for (const item of post) {
							if (!lastID.frealance.includes(item)) {
								lastID.frealance.push(item)
								await Notifier.notifyUsers(
									`https://freelansim.ru/tasks/${item}`
								);
							}
						} 
					}
				} 
				else {
					if(lastID.moiCrug.length === 0) {
						lastID.moiCrug = post;
						for (const item of post) {
							if (item === post[post.length-1]) {
								await Notifier.notifyUsers(
									`https://moikrug.ru/vacancies/${item}`
								);
							}
						}
					} else {
						for (const item of post) {
							if (!lastID.moiCrug.includes(item)) {
								lastID.moiCrug.push(item)
								await Notifier.notifyUsers(
									`https://moikrug.ru/vacancies/${item}`
								);
							}
						} 
					}
				}

			}
		);
		}
	}
}

module.exports = Parser;
