var sqlite3 = require('sqlite3').verbose();
var db;



function openConnectAndCreateDb() {
	return new Promise(r => {
		db = new sqlite3.Database('./shop.db');
		db.serialize(function() {
		  db.run('CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY AUTOINCREMENT, descrition TEXT, name TEXT, category_id INTEGER, price REAL, image TEXT)');
		  db.run('CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, orderStatus TEXT, customerName TEXT, phone TEXT, address TEXT, date DATETIME, totalPrice REAL)');
		  db.run('CREATE TABLE IF NOT EXISTS order_items (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, count INTEGER, name TEXT)');
		  db.run('CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, key TEXT)');
		  db.run('CREATE TABLE IF NOT EXISTS content (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT, key TEXT)');
		});

		r();		
	})
}


function getContents() {
	return new Promise(resolve => {
		db.all("SELECT * FROM content", function(err, rows) {
			resolve(rows)
		})
		
	})
}

function getContentById(id) {
	return new Promise(resolve => {
		db.all("SELECT * FROM content where id = ?", [id], function(err, rows) {
			resolve(rows[0])
		})
	})
}

function createContent(data) {
	return new Promise(resolve => {
		db.run('INSERT INTO content (value, key) VALUES (?, ?)', [data.value, data.key], (err, data) => {
			console.log(err, data);
			resolve(this.lastID)
		})
	})
}

function updateContent(id, data) {
	return new Promise(resolve => {
		var fields = [];
		var values = [];
		for(var key in data) {
			fields.push(`${key} = ? `);
			values.push(data[key]);
		}
		var fieldsStr = fields.join(' , ');
		values.push(id);
		var sql = `UPDATE content SET ${fieldsStr} where id = ?`;

		db.run(sql, values, function(err, data) {
			resolve(this.lastID);
		})
	})
}


function getProducts() {
	return new Promise(resolve => {
		db.all("SELECT * FROM product", function(err, rows) {
			resolve(rows)
		})
		
	})
}

function getOrders() {
	return new Promise(resolve => {
		db.all("SELECT * FROM orders", function(err, rows) {
			resolve(rows)
		})
		
	})	
}

function getOrder(id) {
	return new Promise(resolve => {
		db.all("SELECT * FROM orders where id = ?", [id], function(err, rows) {
			var order = rows[0];

			db.all("SELECT * FROM order_items where order_id = ?", [id], function(err, itemsRows) {
				console.log(err, itemsRows, order)

				order.items = itemsRows;
				resolve(order);
			})
			

			
		})
	})	
}

function getProductById(id) {
	return new Promise(resolve => {
		db.all("SELECT * FROM product where id = ?", [id], function(err, rows) {
			resolve(rows[0])
		})
	})
}

function createProduct(product) {
	return new Promise(resolve => {
		db.run('INSERT INTO product (descrition, name, price, image, category_id) VALUES (?, ?, ?, ?, ?)', [product.descrition, product.name, product.price, product.image, product.category_id], (err, data) => {
			resolve()
		})
	})
}

function removeProduct(id) {
	return new Promise(resolve => {
		db.run('DELETE FROM product WHERE id = ?', [id], (err, data) => {
			resolve()
		})
	})	
}

function createOrder(cart, customerName, phone, address) {
	return new Promise(resolve => {
		var now = new Date();
		var offsetMilliseconds = now.getTimezoneOffset() * 60  *1000
		var localTime = now.getTime() - offsetMilliseconds;
		var cartView = cart.toView();

		db.run('INSERT INTO orders (customerName, phone, address, orderStatus, date, totalPrice) VALUES (?, ?, ?, ?, ?, ?)', 
			[customerName, phone, address, 'created', localTime, cartView.totalPrice], function(err, data) {

			var itemsSave = cartView.items.map(item => {
				return new Promise(r => {
					console.log('>>> ', item);

					db.run('INSERT INTO order_items (order_id, count, name) VALUES (?, ?, ?)', [this.lastID, item.qty, item.item.name], (e, itemData) => {
									

						r();
					})
				})
			})	

			Promise.all(itemsSave).then(() => {
				resolve(this.lastID);
			})

		})

	})
}

function updateOrders(id, data) {
	return new Promise(resolve => {
		var fields = [];
		var values = [];
		for(var key in data) {
			fields.push(`${key} = ? `);
			values.push(data[key]);
		}
		var fieldsStr = fields.join(' , ');
		values.push(id);
		var sql = `UPDATE orders SET ${fieldsStr} where id = ?`;
		console.log(sql);

		db.run(sql, values, function(err, data) {
			resolve(this.lastID);
		})
	})
}

function removeOrder(id) {
	return new Promise(resolve => {
		db.run('DELETE FROM orders WHERE id = ?', [id], (err, data) => {
			resolve()
		})
	})
}


function getCategories() {
	return new Promise(resolve => {
		db.all("SELECT * FROM category", function(err, rows) {
			resolve(rows)
		})		
	})		
}

function removeCategory(id) {
	return new Promise(resolve => {
		db.run('DELETE FROM category WHERE id = ?', [id], (err, data) => {
			resolve()
		})
	})
}


function createCategory(category) {
	return new Promise(resolve => {
		db.run('INSERT INTO category (name, key) VALUES (?, ?)', 
			[category.name, category.key], function(err, data) {
			resolve(this.lastID);
		})

	})
}



function closeConnection() {
	return new Promise(r => {
		db.close(e => {
			r();
		});			
	})
}

module.exports = {
	openConnectAndCreateDb,
	removeOrder,
	getOrder,
	closeConnection,
	getProducts,
	removeProduct,
	createProduct,
	getProductById,
	createOrder,
	getOrders,
	getCategories,
	removeCategory,
	createCategory,
	updateOrders,
	createContent,
	getContents,
	getContentById,
	updateContent
}