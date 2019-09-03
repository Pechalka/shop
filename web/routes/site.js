var express = require('express');
var router = express.Router();

var db = require('../db');
var Cart = require('../Cart');

router.use(function (req, res, next) {
	db.categories.getAll().then((categories) => {
		req.categories = categories;
		next();
	});
});

router.use(function (req, res, next) {
	db.contents.getAll().then((contents) => {
		var content = {};
		contents.forEach(c => {
			content[c.key] = c.value;
		})
		req.content = content;
		next();
	});
});


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

function createOrder(req, res, next) {
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	req.cart = cart;
	var customerName = req.body.customerName;
	var phone = req.body.phone;
	var address = req.body.address;

	db.createOrder(cart, customerName, phone, address).then((orderId) => {
		cart.clean();
		req.session.cart = cart;
		req.orderId = orderId;
		next();
	})
}

router.post('/order', createOrder, (req, res) => {
	res.render('order-create', { 
		orderId: req.orderId, 
		cart: req.cart.toView(), 
		categories: req.categories, 
		content: req.content 
	});
})

router.post('/order.json', createOrder, (req, res) => {
	res.json({
		cart: req.cart.toView(),
		text: req.content['order_created']
	});
})


function addProduct(req, res, next) {
	var id = req.body.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	db.products.getById(id).then(product => {
		cart.add(product, product.id);
		req.session.cart = cart;
		next()
	})	
}

router.post('/add-item', function(req, res) {
	res.redirect('/');
})

router.post('/add-item.json', addProduct, function(req, res) {
	res.json(req.session.cart.toView());
})

router.post('/order/add', addProduct, function(req, res) {
	res.redirect('/order');
})

function removeProduct(req, res, next) {
	var id = req.body.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	db.products.getById(id).then(product => {
		cart.remove(product, product.id);
		req.session.cart = cart;
		next();
	})
}

router.post('/remove-item.json', removeProduct, function(req, res) {
	res.json(req.session.cart.toView());
})

router.post('/order/remove', removeProduct, (req, res) => {
	res.redirect('/order');
})

function renderHomePage(req, res) {
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	db.products.getAll().then(function(products) {
		res.render('home', { products, cart: cart.toView(), categories: req.categories });
	});
}

router.get('/', renderHomePage)
router.get('/:categoryName', renderHomePage)

module.exports = router;