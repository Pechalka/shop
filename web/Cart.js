function Cart(oldCart) {
	this.items = oldCart.items || {};
	this.totalQty = oldCart.totalQty || 0;
	this.totalPrice = oldCart.totalPrice || 0;

	this.add =  function(product, id) {
		if (!this.items[id]) {
			this.items[id] = { item: product, qty: 0 }
		}
		this.items[id].qty++;
		this.totalQty++;
		this.totalPrice += product.price;

		this.totalPrice = +this.totalPrice.toFixed(2);
	}

	this.remove =  function(product, id) {
		if (!this.items[id]) {
			this.items[id] = { item: product, qty: 0 }
		}
		this.items[id].qty--;
		this.totalQty--;
		this.totalPrice -= product.price;
		this.totalPrice = +this.totalPrice.toFixed(2);
		if (this.items[id].qty === 0) {
			delete this.items[id];
		}
	}

	this.toView = function() {
		var items = [];
		for(var key in this.items) {
			items.push(this.items[key]);
		}

		return {
			items,
			totalQty: this.totalQty,
			totalPrice: this.totalPrice
		}
	}

	this.clean = function() {
		this.items = {};
		this.totalQty = 0;
		this.totalPrice = 0;
	}
}

module.exports = Cart;