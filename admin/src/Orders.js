import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {  Link } from "react-router-dom";
import { ROOT_URL } from './config';

class Orders extends React.Component{
	state = {
		orders: []
	}
	load = () => {
		axios.get(ROOT_URL + '/api/orders')
			.then(responce => responce.data)
			.then(orders => {
				this.setState({ orders })
			})

	}
	componentDidMount() {
		this.load();
	}
	remove = (id) => {
		axios.delete(`${ROOT_URL}/api/order/${id}`).then(this.load)
	}
	render() {
		const { orders } = this.state;

		const rows = orders.map(product => (
			<tr key={product.id}>
				<td>
					<Link to={`/orders/${product.id}`}>{product.id}</Link>
				</td>
				<td>{product.customerName}</td>
				<td>{product.orderStatus}</td>
				<td>{product.phone}</td>
				<td>{product.address}</td>
				<td>
					{moment(product.date).utc().format("HH:mm DD-MM")}
				</td>
				<th><button className="button is-small" onClick={() => this.remove(product.id)}>remove</button></th>
			</tr>
		))
		return (
			<div>
				<table className="table is-fullwidth">
					<thead>
						<tr>
							<th>#</th>
							<th>Пользователь</th>
							<th>Статус</th>
							<th>Телефон</th>
							<th>Адрес заказа</th>
							<th>Дата</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
}


export default Orders;
