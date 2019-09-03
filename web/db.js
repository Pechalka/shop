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


function getOrder(id) {
	return new Promise(resolve => {
		db.all("SELECT * FROM orders where id = ?", [id], function(err, rows) {
			var order = rows[0];

			db.all("SELECT * FROM order_items where order_id = ?", [id], function(err, itemsRows) {

				order.items = itemsRows;
				resolve(order);
			})
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



function closeConnection() {
	return new Promise(r => {
		db.close(e => {
			r();
		});			
	})
}

function collection(table) {
	return {
		getAll:() => {
			return new Promise((resolve, reject) => {
				db.all(`SELECT * FROM ${table}`, function(err, rows) {
					if (err)
						reject(err);
					else
						resolve(rows)
				})	
			})
		},
		getById:(id) => {
			return new Promise((resolve, reject) => {
				db.all(`SELECT * FROM ${table} where id = ?`, [id], function(err, rows) {
					if (err)
						reject(err);
					else
						resolve(rows[0])
				})
			})
		},
		remove: (id) => new Promise((resolve, reject) => {
			db.all(`DELETE FROM ${table} where id = ?`, [id], function(err, rows) {
				if (err)
					reject(err);
				else
					resolve(rows)
			})
		}),
		create: (data) => {
			return new Promise((resolve, reject) => {
				var values = [];
				var fields = [];
				for(var key in data) {
					fields.push(key);
					values.push(data[key]);
				}

				db.run(
					`INSERT INTO ${table} (${fields.join(',')}) VALUES (${fields.map(() => '?').join(',')})`, 
					values, 
					function(err, data) {
						if (err) 
							reject(err);
						else
							resolve(this.lastID);
				})
			})
		},
		update: (id, data) => {
			return new Promise((resolve, reject) => {
				var fields = [];
				var values = [];
				for(var key in data) {
					fields.push(`${key} = ? `);
					values.push(data[key]);
				}
				var fieldsStr = fields.join(' , ');
				values.push(id);
				var sql = `UPDATE ${table} SET ${fieldsStr} where id = ?`;

				db.run(
					sql, 
					values, 
					function(err, data) {
						if (err) 
							reject(err);
						else
							resolve(this.lastID);
				})
			})
		}
	}
}

module.exports = {
	collection,

	openConnectAndCreateDb,
	closeConnection,

	products: collection('product'),
	orders: collection('orders'),
	contents: collection('content'),
	categories: collection('category'),

	getOrder,
	createOrder
}