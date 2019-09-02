import React from 'react';
import axios from 'axios';
import moment from 'moment';

class OrdersInfo extends React.Component{
	state = {
		items: [
			{ id: 1, name: 'Сырная', count: 1 }
		],
		order: null
	}

	componentDidMount() {
		axios.get(`http://localhost:5000/api/orders/${this.props.match.params.id}`)
			.then(responce => responce.data)
			.then(order => {
				this.setState({ order, items: order.items })
			})
	}

	confirm = () => {
		axios.put(`http://localhost:5000/api/orders/${this.props.match.params.id}`, { orderStatus: 'confirm' })
		.then(() => {
			this.props.history.push('/orders');
		})
		
	}

	remove = () => {
		axios.delete(`http://localhost:5000/api/order/${this.props.match.params.id}`).then(() => {
			this.props.history.push('/orders');
		})
	}

	render() {
		const { items, order } = this.state;
		
		if (!order) return <div>loading...</div>;

		const rows = items.map(row => (
			<tr key={row.id}>
				<td>{row.name}</td>
				<td>{row.count}</td>
			</tr>
		))


		const { customerName, address, phone, date, totalPrice, orderStatus } = order;
		return (
			<div>
				<div>
					<p>Имя: {customerName}</p>
					<p>Адрес: {address}</p>
					<p>Телефон: {phone}</p>
					<p>Дата: {moment(date).utc().format("HH:mm DD-MM")}</p>
					<table className="table">
						<thead>
							<tr>
								<th>Наименование</th>
								<th>Количество</th>
							</tr>
						</thead>
						<tbody>
							{rows}
						</tbody>
					</table>
					<h3>Итого: {totalPrice}</h3>
					<p>
					{orderStatus === 'confirm' ? (
						<button  onClick={this.remove} className="button">Удалить</button>
					) : (
						<button  onClick={this.confirm} className="button">Подтвердить</button>						
					)}
					</p>
				</div>
			</div>
		);
	}
}


export default OrdersInfo;
