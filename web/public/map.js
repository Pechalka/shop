ymaps.ready(init);

function init(){ 
    var myMap = new ymaps.Map("map", {
        center: [53.91, 27.6],
        zoom: 12
    });

	myMap.geoObjects.add(new ymaps.Placemark(
		[53.91, 27.61]       
	));

	myMap.geoObjects.add(new ymaps.Placemark(
		[53.91, 27.62]       
	));

	myMap.geoObjects.add(new ymaps.Placemark(
		[53.91, 27.63]       
	));
}