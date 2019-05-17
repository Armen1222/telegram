var express = require('express');
var router = express.Router();
const telegramNotifier = require('../services/telegramNotifier');
const conditionsModel = require('../models/conditions');
const lotsModel = require('../models/lots');

/* GET home page. */
router.get('/', async (req, res, next) => {
  let conditions = await conditionsModel.find({});

  res.render('index', { title: 'Main page', conditions: conditions });
});

router.get('/delete/:id', async (req, res, next) => {
    let conditionId = req.params.id;
    await lotsModel.find({condition: conditionId}).remove().exec();
    await conditionsModel.find({_id: conditionId}).remove().exec();
	res.redirect('/');
});

router.post('/add', async (req, res, next) => {
    console.log(req);
    let name = req.body.name;
    let link = req.body.link;
    let newCondition = conditionsModel({name: name, conditions: link});
    await newCondition.saveAsync();

	res.redirect('/');
});

module.exports = router;
