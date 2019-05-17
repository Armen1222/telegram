var express = require('express');
var router = express.Router();
const axios = require('axios');
const conditions = require('../models/conditions');

/* GET home page. */
router.get('/start', async (req, res, next) => {
	let data = {
		name: "Bmw - buy now",
		conditions: {
			CountOfVehicles: 1000,
			Keyword: '',
			Scope: '',
			SortAscending: false,
			SortField: 'liveDatetime',
			StartIndex: 1,
			TimeZoneID: 120,
			RequestedApp: 3,
			SelectedRefiners: [
				{
					RefinerTypeValue: 'make',
					RefinerValue: 'Bmw'
				},
				{
					RefinerTypeValue: 'quicklinks',
					RefinerValue: 'I-buy Fast'
				},
				{
					RefinerTypeValue: 'readyforbid',
					RefinerValue: 'true'
				}
			],
			SortRule: [
				{
					Ascending: true,
					FieldName: 'livedatetime'
				}
			]
		}
	};

	let cond =  new conditions(data);

	await cond.saveAsync()


	//
	//
	// axios.post('https://mapp.iaai.com/acserviceswebapi/api/GetsearchResults',
	// 	{
	// 		CountOfVehicles: 1000,
	// 		Keyword: '',
	// 		Scope: '',
	// 		SortAscending: false,
	// 		SortField: 'liveDatetime',
	// 		StartIndex: 1,
	// 		TimeZoneID: 120,
	// 		RequestedApp: 3,
	// 		SelectedRefiners: [
	// 			{
	// 				RefinerTypeValue: 'make',
	// 				RefinerValue: 'Bmw'
	// 			},
	// 			{
	// 				RefinerTypeValue: 'quicklinks',
	// 				RefinerValue: 'I-buy Fast'
	// 			},
	// 			{
	// 				RefinerTypeValue: 'readyforbid',
	// 				RefinerValue: 'true'
	// 			}
	// 		],
	// 		SortRule: [
	// 			{
	// 				Ascending: true,
	// 				FieldName: 'livedatetime'
	// 			}
	// 		]
	// 	})
	// 	.then(function (response) {
	// 		console.log(response.data['Vehicles'].length);
	// 		res.send(response.data['Vehicles']);
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 	});
});

module.exports = router;
