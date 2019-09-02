 var eventTopics =  {};

var appEvents = {
    on:  function (eventName, listener) {
        if ( !eventTopics[eventName] || eventTopics[eventName].length < 1) {
                eventTopics[eventName] = [];
        }
        eventTopics[eventName].push(listener);
    },
   
    emit: function (eventName , params) {
        if ( !eventTopics[eventName] || eventTopics[eventName].length < 1) return;
          eventTopics[eventName].forEach(function (listener) {
            listener( !!params ? params : {} );
        });
    }
    
} 

function postJson(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())    
}

function addProduct(id) {
    return postJson('/add-item.json', { id });
}

function removeProduct(id) {
    return postJson('/remove-item.json', { id });
}

appEvents.on('products:add-item', (id) => {
    addProduct(id).then(cart => {
        appEvents.emit('header:cart-change', cart);
    })
})

appEvents.on('order-items:add', (id) => {
    addProduct(id).then(cart => {
        appEvents.emit('header:cart-change', cart)
        appEvents.emit('order-items:cart-change', cart);
        appEvents.emit('order-form:cart-change', cart);
    })
})

appEvents.on('order-items:remove', (id) => {
    removeProduct(id).then(cart => {
        appEvents.emit('header:cart-change', cart)
        appEvents.emit('order-items:cart-change', cart);
        appEvents.emit('order-form:cart-change', cart);
    })
})

appEvents.on('order-form:sumbit', order => {
    postJson('/order.json', order).then((result) => {
        appEvents.emit('header:cart-change', result.cart)
        appEvents.emit('order-items:hide');
        appEvents.emit('order-form:show-result', result.text);
    })
})