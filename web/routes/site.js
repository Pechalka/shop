var express = require('express');
var router = express.Router();

var db = require('../db');

var Cart = require('../Cart');

router.use(function (req, res, next) {
	db.getCategories().then((categories) => {
		req.categories = categories;
		next();
	});
});

router.use(function (req, res, next) {
	db.getContents().then((contents) => {
		var content = {};
		contents.forEach(c => {
			content[c.key] = c.value;
		})
		req.content = content;
		next();
	});
});


router.get('/', (req, res) => {
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	db.getProducts().then(function(products) {
		res.render('home', { products, cart: cart.toView(), categories: req.categories });
	});
})

router.get('/:categoryName', (req, res) => {
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	db.getProducts().then(function(products) {
		res.render('home', { products, cart: cart.toView(), categories: req.categories });
	});
})

router.get('/vacancy', (req, res) => {
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	res.render('vacancy', { cart: cart.toView(), categories: req.categories, content: req.content });
})

router.get('/contacts', (req, res) => {
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	res.render('contacts', { cart: cart.toView(), categories: req.categories, content: req.content });
})


router.get('/order', (req, res) => {
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	res.render('order', { cart: cart.toView(), categories: req.categories });
})


router.post('/order', (req, res) => {
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	var customerName = req.body.customerName;
	var phone = req.body.phone;
	var address = req.body.address;

	db.createOrder(cart, customerName, phone, address).then((orderId) => {
		cart.clean();
		req.session.cart = cart;
		res.render('order-create', { orderId, cart: cart.toView(), categories: req.categories, content: req.content });
	})
})

router.post('/add-item', function(req, res) {
	var id = req.body.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	db.getProductById(id).then(product => {
		cart.add(product, product.id);
		req.session.cart = cart;
		res.redirect('/');
	})
})



router.post('/order/add', (req, res) => {
	var id = req.body.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	db.getProductById(id).then(product => {
		cart.add(product, product.id);
		req.session.cart = cart;
		res.redirect('/order');
	})
})

router.post('/order/remove', (req, res) => {
	var id = req.body.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	db.getProductById(id).then(product => {
		cart.remove(product, product.id);
		req.session.cart = cart;
		res.redirect('/order');
	})
})


module.exports = router;