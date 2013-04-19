$(function() {
	var productsList = $('.js-products-list'),
		config = {};

	function shuffle(o) {
	    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	};

	function printList(list) {
		if( shuffleList ) {
			list = shuffle(list);
		}

		for (var i = 0, len = list.length; i < len; i++) {
			var data = list[i].split("\t");

			if (data.length !== 4) {
				console.log('Formato inválido na linha %s: %s', i, list[i]);
				continue;
			}

			var n = i + 1;

			var status  = data[0];
				type  = data[1];
				price = data[2];
				title = data[3];

			var product = {};

			var item = $('<li></li>').attr('id', 'product-' + n).addClass('product');
				item.append($('<span><sup>' + unit + '</sup>' + price + '</span>').addClass('product__price'));
				item.append($('<h2><span>' + title + '</span></h2>').addClass('product__title'));

			switch(type) {
				case 'd': product.type = 'dvd'; break;
				case 'b': product.type = 'book'; break;
			}

			for (var j = 0, lenj = status.length; j < lenj; j++) {
				var s = status[j];
				switch(s) {
					case 's': product.sold = true; break;
				}
			}

			if (product.sold) {
				item.addClass( 'is-sold' );
				item.append($('<span>Vendido &#10004;</span>').addClass('product__status'));
			}

			if (product.type)
				item.addClass('product--' + product.type);

			productsList.append(item);
		}
	}


  // Load product list from config.productsFile
  function loadProducts() {
  	$.ajax({
  		url: config.productsFile,
  		cache: false,
  		success: function (data) {
  			var productList = data.split(/[\r\n]+/g);
  			printList(productList);
  		},
  		dataType: 'text'
  	});
  }

  // Global Flms class
  window.bzr = {
	start: function(newConfig) {
		config = newConfig;
		shuffleList = config.shuffleList;
		unit = config.unit

		loadProducts();
	}
};
});
