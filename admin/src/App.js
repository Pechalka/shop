import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";

import Products from './Product';
import Orders from './Orders';
import OrdersInfo from './OrdersInfo';
import Contents from './Contents';
import ContentEdit from './ContentEdit';

class App extends React.Component{
	render() {
		return (
			<Router>
				<nav className="navbar  is-link" role="navigation" aria-label="main navigation">
		          <div className="navbar-menu">
		            <div className="navbar-start">
		              <NavLink activeClassName='is-active' className="navbar-item" to="/contents">Контент</NavLink>
		              <NavLink exact  activeClassName='is-active' className="navbar-item" to="/products">Продукты</NavLink>
		              <NavLink activeClassName='is-active' className="navbar-item" to="/orders">Заказы</NavLink>		              
		            </div>
		          </div>
		        </nav>
		      <div className="container is-fluid">
		        <div >
			        <Route path="/orders/:id"  exact component={OrdersInfo} />
			        <Route path="/orders"  exact component={Orders} />
			        <Route path="/products"  component={Products} />
			        <Route path="/contents/:id"  component={ContentEdit} />
			        <Route path="/contents" exact component={Contents} />
		        	<Redirect exact from="/" to="/orders" />
		        </div>
		      </div>
		    </Router>
		);
	}
}


export default App;
