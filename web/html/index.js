import { storiesOf } from '@storybook/html';

import header from './header.html';
import headerEmpty from './headerEmpty.html';

import orderItems from './order-items.html';
import orderForm from './order-form.html';
import orderFormValidation from './order-form-validation.html';

import products from './products.html';
import typography from './typography.html';

import contacts_top from './contacts_top.html';
import contacts_bottom from './contacts_bottom.html';
import vacancy from './vacancy.html';
import orderCreated from './order-created.html';

import '../public/styles.css';

const Layout = (content) => `
	<div class="content">
		${content}
	</div>
`;

const HtmlContent = (html) => `
	<div class="input-text">
		${html}
	</div>
`

storiesOf('controls', module)
  .add('header', () => header)
  .add('header empty cart', () => headerEmpty)
  .add('order-item', () => Layout(orderItems))
  .add('order-form', () => Layout(orderForm))
  .add('order-form validation', () => Layout(orderFormValidation))
  .add('products', () => Layout(products))
  .add('html', () => Layout(HtmlContent(typography)))


storiesOf('pages', module)
  .add('home', () => `
		${header}
		<div class="content">
			${products}
		</div>
  	`)
  .add('order', () => `
		${header}
		<div class="content">
			${orderItems}
			${orderForm}			
		</div>
  	`)
  .add('order-created', () => `
		${header}
		<div class="content">
			${HtmlContent(orderCreated)}		
		</div>
  	`)
  .add('concats', () => `
		${header}
		<div class="content">
			${HtmlContent(contacts_top)}
			<div class="map"></div>
			${HtmlContent(contacts_bottom)}		
		</div>
  	`)
    .add('vacancy', () => `
		${header}
		<div class="content">
			${HtmlContent(vacancy)}		
		</div>
  	`) 