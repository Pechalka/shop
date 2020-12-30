
var db = require('./db');
const fs = require('fs');

 fs.unlinkSync('./shop.db')

db.openConnectAndCreateDb().then(() => 
	db.categories.create({ name: 'Пицца', key: 'pizza'})
).then(pizza => Promise.all([
	db.products.create({
		name: 'Буженина и шампиньоны',
		descrition: 'пицца-соус, буженина (свинина), свежий болгарский перец, свежие шампиньоны, свежий лук, сыр моцарелла, базилик',
		price: 16.9,
		image: 'uploads/f547cbdd-f0d2-47b4-8782-1161eed1010a.jpg',
		category_id: pizza
	}),
	db.products.create({
		name: 'Буженина и сливочный сыр',
		descrition: 'пицца-соус, буженина (свинина), свежие томаты, сливочный сыр, свежий лук, сыр моцарелла, базилик',
		price: 18.9,
		image: 'uploads/f547cbdd-f0d2-47b4-8782-1161eed1010a.jpg',
		category_id: pizza
	}),
	db.products.create({
		name: 'Гавайская',
		descrition: 'сырный соус, ветчина, филе цыпленка, ананасы, сыр моцарелла, базилик',
		price: 16.9,
		image: 'uploads/f547cbdd-f0d2-47b4-8782-1161eed1010a.jpg',
		category_id: pizza
	})
])).then(() => 
	db.categories.create({ name: 'Напитки', key: 'drinks'})
).then(drinks => Promise.all([
	db.products.create({
		name: 'Coca-Cola',
		descrition: '1 л',
		price: 2.7,
		image: 'uploads/f547cbdd-f0d2-47b4-8782-1161eed1010a.jpg',
		category_id: drinks
	}),
	db.products.create({
		name: 'Sprite',
		descrition: '0.5 л',
		price: 1.9,
		image: 'uploads/f547cbdd-f0d2-47b4-8782-1161eed1010a.jpg',
		category_id: drinks
	}),
	db.products.create({
		name: 'Сок RICH Яблоко',
		descrition: '1 л',
		price: 4,
		image: 'uploads/f547cbdd-f0d2-47b4-8782-1161eed1010a.jpg',
		category_id: drinks
	}),
	db.products.create({
		name: 'Burn',
		descrition: '0.25 л',
		price: 3,
		image: 'uploads/f547cbdd-f0d2-47b4-8782-1161eed1010a.jpg',
		category_id: drinks
	})
])).then(() => 
	db.categories.create({ name: 'Десерты', key: 'desserts'})
).then(desserts => Promise.all([
	db.products.create({
		name: 'Чизкейк',
		descrition: '110 г',
		price: 5.5,
		image: 'uploads/f547cbdd-f0d2-47b4-8782-1161eed1010a.jpg',
		category_id: desserts
	})
])).then(() => {
	return Promise.all([
		db.contents.create({
			key: 'vacancy',
			value: (`<div>
				<h1>Вакансии</h1>
				<h2>Водитель-курьер</h2>
				<h3>Предлагаем:</h3>
				<ul>
					<li>доставка по Фрунзенскому, Московскому, Центральному, Ленинскому, Советскому, Первомайскому, Заводскому районам (небольшие расстояния: до 8 км. за выезд);</li>
					<li>условия оплаты от 80 до 200 рублей (до вычета НДФЛ) за смену;</li>
					<li>2-6 доставки за выезд (стоимость одной доставки - 3,70 рубля (до вычета НДФЛ), стоимость одной доставки в Центральном районе - 3 рубля 90 копеек (до вычета НДФЛ));</li>
					<li>20-40 доставок за смену;</li>
					<li>надбавка за работу в ночную смену.</li>
				</ul>

				<h3>Требования:</h3>
				<ul>
					<li>опыт работы не обязателен;</li>
					<li>наличие личного авто в исправном техническом состоянии, отсутствие внешних дефектов автомобиля;
					наличие смартфона.</li>
				</ul>

				<h3>Условия:</h3>

				<ul>
					<li>расчет 2 раза в месяц;</li>
					<li>скидка на блюда собственного производства в рабочее время;</li>
					<li>возможность установить гибкий график;</li>
					<li>система мотивации и бонусов с первого дня работы;</li>
					<li>возможность карьерного роста.</li>
				</ul>
				<strong>
					Условия оплаты:  от 1 500 до 2 500 бел. руб. до вычета НДФЛ.
				</strong>

				<p>
					Отправляйте свое резюме на почту h@spz.by с пометкой «Водитель-курьер».
				</p>

				<strong>
					Контакты:<br/>
					+375 (29) 111 2222 <br/>
					+375 (44) 222 3333 <br/>
				</strong>

				<p>h@spz.by<p/>
				</div>
				<div>
					<h2>Оператор колл-центра</h2>
					<p>Мы предлагаем Вам пройти полное обучение за счет компании!</p>

					<h3>Причины работать у нас:</h3>
					<ul>
						<li>почасовая оплата труда;</li>
						<li>дополнительные ежемесячные премии сотрудникам, работающим в компании больше 3 месяцев;</li>
						<li>скидка на все меню в рабочее время.</li>
					</ul>

					<h3>В чем заключается работа:</h3>
					<ul>
						<li>прием заказов по телефону и оформление их в программе;</li>
						<li>подтверждение и обработка интернет-заказов;</li>
						<li>консультирование клиентов по меню, условиям доставки и т.д.;</li>
						<li>соблюдение стандартов качества обслуживания, установленных в компании.</li>
					</ul>

					<h3>Наши пожелания к претенденткам:</h3>

					<ul>
						<li>грамотная русская речь;</li>
						<li>внимательное отношение к людям;</li>
						<li>готовность и желание регулярно обновлять свои знания;</li>
						<li>график работы посменное в удобное время.</li>
						<li>Условия оплаты: от 500 до 700 бел.руб. до вычета НДФЛ.</li>
					</ul>

					<p>
						Отправляйте свое резюме на почту h@spz.by с пометкой «Оператор»
					</p>

					<strong>Контакты:<br/>

						+375 (29) 111 2222 <br/>
						+375 (44) 222 3333 <br/>

					</strong>
					h@spz.by
				</div>

			</div>`).replace(/\t/g, '').replace(/\n/g, '')
		}),
		db.contents.create({
			key: 'contacts_top',
			value: (`
<h1>Контакты</h1>
				<h2>Прием заказов на доставку и самовывоз:</h2>
				<p>пр. Любимова, 12/1, круглосуточно</p>

<p>ул. Городецкая, 32а, круглосуточно</p>

<p>пр. Рокоссовского, 113а, круглосуточно</p>

<p>Правило "15 минут или пицца бесплатно" действует только при заказе через окно самовывоза. Компания оставляет за собой право изменять условия обслуживания через окно самовывоза, предупреждая об этом Клиента в момент оформления заказа.</p>

<p>При заказе на самовывоз онлайн или через колл-центр действует правило "вовремя или пицца бесплатно". Если заказ не будет готов ко времени, указанному при оформлении заказа, то одну пиццу или другое блюдо с наименьшей ценой из своего заказа Клиент получает бесплатно.</p>
			`).replace(/\t/g, '').replace(/\n/g, '')
		}),
		db.contents.create({
			key: 'contacts_bottom',
			value: (`
<p>Все адреса Фрунзенского, Московского, Первомайского, Ленинского, Советского, Центрального, Заводского (кроме микрорайона Сосны) и Партизанского районов города Минска, а также часть Октябрьского района.</p>

<p>Поселки и деревни Минского района: Боровляны, Лесной, Валерьяново, Копище, Солнечный, Боровая, Богатырево, Озерцо, Малиновка, Тарасово, Каменная Горка, Ждановичи, Ярково, Большое Стиклево, Большой Тростенец.</p>

<p>Подробную информацию можно посмотреть на карте, расположенной выше,  или уточнить  у оператора колл-центра по телефону 111-22-33 (велком, мтс, лайф).</p>

<p>
Правило "60 минут или пицца бесплатно" действует в пятницу, субботу, предпраздничные и праздничные дни. В остальные дни действует правило "45 минут или пицца бесплатно". Компания оставляет за собой право изменять дни действия правил доставки "60 минут или пицца бесплатно" и "45 минут или пицца бесплатно", предупреждая об этом Клиента в момент оформления заказа.</p>

<p><strong>Заказы принимаются на сайте и по телефону 111-22-33 (велком, мтс, лайф)​.</strong></p>

<p><strong>Замечания и предложения направляйте по адресу v@spz.by</strong></p>
			`).replace(/\t/g, '').replace(/\n/g, '')
		}),
		db.contents.create({
			key: 'order_created',
			value: (`
	<h1>Заказ принят</h1>
      <h2>Спасибо, Ваш заказ принят и будет доставлен курьером в течение 45 минут.</h2>
      <p>
        Обработка заказа, оформленного через сайт, осуществляется в течение пяти минут. Временем принятия заказа через сайт будет считаться время окончания обработки заказа оператором.
      </p>
      <p>
        Если Вы совершаете заказ с Вашего номера телефона через нашу компанию впервые, после отправки заказа с Вами свяжется оператор для подтверждения заказа. Начиная со второго заказа проверка по телефону осуществляться не будет. 
      </p>
			`).replace(/\t/g, '').replace(/\n/g, '')
		})
	])
}).then(() => {
	db.closeConnection();
})

