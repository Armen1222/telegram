const TelegramBot = require('node-telegram-bot-api');
//const Chats = require('../models/bot');
// USAGE
// npm install node-telegram-bot-api
// const telegramNotifier = require('../services/telegramNotifier');
// telegramNotifier.notifyUsers('Notification message text');

class TelegramNotifier {
	constructor() {
		// Get from config file <start>
		const token = 'token';
		this.chatIds = ['574917897'];
		this.bot = new TelegramBot(token, { polling: true } );
		console.log('wwwwwwww');
		this.onIncomingMessage();
	}

	onIncomingMessage() {
		this.bot.on('message', async (msg) => {
			let AllChats = [];
			console.log('msg');
			for(let chat of AllChats) {
				this.chatIds.push(chat.chatId);
			}

			if(msg.text === 'subscribe') {
				if(!this.chatIds.includes(msg.chat.id)) {
					console.log(msg.chat.id);
					//this.chatIds.push(msg.chat.id);
					await this.bot.sendMessage(msg.chat.id, 'Shnorhakalutyun, nor ban linelu depqum duq ktexekacveq');
				} else {
					await this.bot.sendMessage(msg.chat.id, 'Duq arden grancvats eq, nor haytararutyan depqum ktexekacveq');
				}
				return;
			}

			await this.bot.sendMessage(
				msg.chat.id,
				`Grir passwordy vor dzer chaty avelana`
			);
		});
	}


	async notifyUsers(message) {
		for(let chatId of this.chatIds) {
			await this.bot.sendMessage(chatId, message);
		}
	}

}

const telegramNotifier = new TelegramNotifier();
module.exports = telegramNotifier;