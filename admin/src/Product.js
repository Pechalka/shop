import React from 'react';
import axios from 'axios';

class Products extends React.Component{
	state = { 
		products: [],
		photo: null,
		categories: [],
		categoriesMap: {}
	};
	loadProducts = () => {
		axios.get('http://localhost:5000/api/products')
			.then(responce => responce.data)
			.then(products => {
				this.setState({ products })
			})

	}
	loadCategories = () => {
		axios.get('http://localhost:5000/api/category')
			.then(responce => responce.data)
			.then(categories => {
				const categoriesMap = categories.reduce((res, item ) =>({ ...res, [item.id]: item }), {});
				this.setState({ categories, categoriesMap })
			})
	}
	componentDidMount() {
		this.loadProducts();
		this.loadCategories();
	}
	add = () => {

	  const { selectedFile } = this.state;
      let formData = new FormData();
      formData.append('selectedFile', selectedFile);

      axios.post('http://localhost:5000/upload', formData)
      	.then(response => response.data)
        .then((data) => {
			const product = {
				price: this.refs.price.value,
				name: this.refs.name.value,
				descrition: this.refs.descrition.value,
				image: data.path,
				category_id: this.refs.category_id.value
			}
			
			this.refs.price.value = '';
			this.refs.name.value = '';
			this.refs.descrition.value = '';

			axios.post('http://localhost:5000/api/products', product)
				.then(this.loadProducts)

        });
	}

	remove = (product) => {
		axios.delete('http://localhost:5000/api/products/' + product.id, product)
			.then(this.loadProducts)

	}

	selectFile = (e) => {
		this.setState({ selectedFile: e.target.files[0] });
	}

	addCategory = () => {
		const name = this.refs.category_name.value;
		const key = this.refs.category_key.value;
		this.refs.category_name.value = '';
		this.refs.category_key.value = '';
		axios.post('http://localhost:5000/api/category', { name, key })
				.then(this.loadCategories)
	}
	removeCategory = (id) => {
		axios.delete('http://localhost:5000/api/category/' + id)
			.then(this.loadCategories)
	}
	categoryName = (product) => {
		const { categoriesMap } = this.state;
		const id = product.category_id;
		
		if (!categoriesMap[id]) return id;

		return categoriesMap[id].name;
	}
	render() {
		const { products } = this.state;

		const rows = products.map(product => (
			<tr key={product.id}>
				<td><img width={50} src={`http://localhost:5000/${product.image}`} /></td>
				<td>{product.name}</td>
				<td>{product.price}</td>
				<td>{product.descrition}</td>
				<td>{this.categoryName(product)}</td>
				<td><button className="button is-small" onClick={() => this.remove(product)}>remove</button></td>
			</tr>
		));

		const categoriesRows = this.state.categories.map(category => (
			<tr key={category.id}>
				<td>{category.name} | {category.key}</td>
				<td><button onClick={() => this.removeCategory(category.id)} className="button is-small">удалить</button></td>
			</tr>
		))
		return (
			<div>
				<table className="table is-fullwidth">
					<thead>
						<tr>
							<th></th>
							<th>Название</th>
							<th>цена</th>
							<th>Описание</th>
							<th>Категория</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
				<div className="columns">
					<div className="column">
						<h2 className="title">Новый товар</h2>
						<div className="field">
							<label className="label">Название</label>
							<div className="control">
								<input className="input" ref='name' type='text' />
							</div>
						</div>
						<div className="field">
							<label className="label">Категория</label>
							<div className="control">
								<div className="select">
								<select ref='category_id'>
									{this.state.categories.map(c => (
										<option key={c.id} value={c.id}>{c.name}</option>
									))}
							    </select>
							    </div>
							</div>
						</div>
						<div className="field">
							<label className="label">Цена</label>
							<div className="control">
								<input className="input" ref='price' type='text' />
							</div>
						</div>
						<div className="field">
						  <label className="label">Описание</label>
						  <div className="control">
						    <textarea ref='descrition' className="textarea" placeholder="пицца..."></textarea>
						  </div>
						</div>
						<div className="field">
							<div className="control">
								<input onChange={this.selectFile} type='file' />
							</div>
						</div>
						<div className="field">
							<div className="control">
							<button className="button is-link" onClick={this.add}>Добавить</button>
							</div>
						</div>
					</div>
					<div className="column">
						<h2 className="title">Категории товара</h2>
						<table className="table is-fullwidth">
							<tbody>
								{categoriesRows}
							</tbody>
						</table>
						<div style={{ width: 200 }}>
							<div className="field">
								<label className="label">Категория</label>
								<p className="control">
									<input ref='category_name' className="input"/>
								</p>
							</div>
							<div className="field">
								<label className="label">Ключ</label>
								<p className="control">
									<input ref='category_key' className="input"/>
								</p>
							</div>

							<p className="control">
								<button onClick={this.addCategory} className="button is-small">добавить</button>
							</p>

						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default Products;
