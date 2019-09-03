var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/products', function(req, res) {
	db.products.getAll().then(function(products) {
		res.json(products);		
	})
})

router.post('/products', function(req, res) {
	db.products.create(req.body).then(() => {
		res.json('ok');
	})
})

router.delete('/products/:id', function(req, res) {
	db.products.remove(req.params.id).then(() => {
		res.json('ok');
	})
})


router.get('/orders', function(req, res) {
	db.orders.getAll().then(function(rows) {
		res.json(rows);		
	})
})

router.put('/orders/:id', function(req, res) {
	db.orders.update(req.params.id, req.body).then(function(rows) {
		res.json(rows);		
	})
})

router.get('/orders/:id', function(req, res) {
	db.getOrder(req.params.id).then(function(order) {
		res.json(order);		
	})
})

router.delete('/order/:id', (req, res) => {
	db.orders.remove(req.params.id).then(() => {
		res.json('ok');
	})
})


router.get('/contents', function(req, res) {
	db.contents.getAll().then((rows) => {
		res.json(rows);
	})
})

router.get('/contents/:id', function(req, res) {
	db.contents.getById(req.params.id).then((rows) => {
		res.json(rows);
	})
})

router.put('/contents/:id', function(req, res) {
	db.contents.update(req.params.id, req.body).then(function(rows) {
		res.json(rows);		
	})
})


router.get('/category', function(req, res) {
	db.categories.getAll().then((rows) => {
		res.json(rows);
	})
})

router.post('/category', function(req, res) {
	db.categories.create(req.body).then((id) => {
		res.json(id);
	})
})

router.delete('/category/:id', function(req, res) {
	db.categories.remove(req.params.id).then(() => {
		res.json('ok');
	})
})

module.exports = router;