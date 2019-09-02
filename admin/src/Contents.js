import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {  Link } from "react-router-dom";

class Contents extends React.Component{
	state = {
		contents: []
	}
	load = () => {
		axios.get('http://localhost:5000/api/contents')
			.then(responce => responce.data)
			.then(contents => {
				this.setState({ contents })
			})

	}
	componentDidMount() {
		this.load();
	}

	render() {
		const { contents } = this.state;

		const rows = contents.map(item => (
			<tr key={item.key}>
				<td>
					<p>{item.key}</p>
					<Link to={`/contents/${item.id}`} className="button">редактировать</Link>
				</td>
				<td>
					<div className="content-holder content" dangerouslySetInnerHTML={{ __html: item.value }}>
					</div>
				</td>
			</tr>
		))
		return (
			<div>
				<table className="table is-fullwidth">
					<thead>
						<tr>
							<th style={{ width: 200 }}>Ключ</th>
							<th>Контент</th>
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


export default Contents;
