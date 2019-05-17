var HTMLParser = require('node-html-parser');

class HtmlParser {
	constructor() {

	}

	getPageItems(data, isMoiCrug) {			
		const root = HTMLParser.parse(data);
		if (isMoiCrug) {
			let items = root.querySelectorAll('.job');
			let itemArray = [];
			for (const item of items) { 
				let link = item.id.split('_');
				let href = link[1];
				itemArray.splice( 0, 0, href )				
			}
			return itemArray
		} else {
			let items = root.querySelectorAll('.task__title');
			let itemArray = [];
			for (const item of items) { 
				let str = item.childNodes[1].rawAttrs;
				let link = str.split('/')[2];
				let href = link.replace('"','')
				itemArray.splice( 0, 0, href )
			}
			return itemArray
		}
	}

	getItemPostDates(data) {
		const root = HTMLParser.parse(data);
		let dates = root.querySelector('.footer');

		let updateDate = null;
		if(dates.childNodes[1]) {
			updateDate = dates.childNodes[1].rawText;
		}

		let postDate = null;
		if(dates.childNodes[2]) {
			postDate = dates.childNodes[2].rawText;
		}

		if(!updateDate) {
			return false;
		}
		updateDate = updateDate.match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}")[0];


		if(postDate) {
			postDate = postDate.match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}")[0];
		}

		if(updateDate && !postDate) {
			return true;
		}

		if (updateDate == postDate) {
			return true;
		}

		return false;

	}

}

module.exports =  new HtmlParser();