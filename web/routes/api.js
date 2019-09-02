var express = require('express');
var router = express.Router();

var db = require('../db');

router.delete('/order/:id', (req, res) => {
	db.removeOrder(req.params.id).then(() => {
		res.json('ok');
	})
})


router.get('/products', function(req, res) {
	db.getProducts().then(function(products) {
		res.json(products);		
	})
})


router.get('/orders', function(req, res) {
	db.getOrders().then(function(rows) {
		res.json(rows);		
	})
})

router.put('/orders/:id', function(req, res) {
	db.updateOrders(req.params.id, req.body).then(function(rows) {
		res.json(rows);		
	})
})

router.get('/orders/:id', function(req, res) {
	db.getOrder(req.params.id).then(function(order) {
		res.json(order);		
	})
})

router.post('/products', function(req, res) {
	db.createProduct(req.body).then(() => {
		res.json('ok');
	})
})

router.delete('/products/:id', function(req, res) {
	db.removeProduct(req.params.id).then(() => {
		res.json('ok');
	})
})

router.get('/contents', function(req, res) {
	db.getContents().then((rows) => {
		res.json(rows);
	})
})

router.get('/contents/:id', function(req, res) {
	db.getContentById(req.params.id).then((rows) => {
		res.json(rows);
	})
})

router.put('/contents/:id', function(req, res) {
	db.updateContent(req.params.id, req.body).then(function(rows) {
		res.json(rows);		
	})
})


router.get('/category', function(req, res) {
	db.getCategories().then((rows) => {
		res.json(rows);
	})
})

router.post('/category', function(req, res) {
	db.createCategory(req.body).then((id) => {
		res.json(id);
	})
})

router.delete('/category/:id', function(req, res) {
	db.removeCategory(req.params.id).then(() => {
		res.json('ok');
	})
})

module.exports = router;