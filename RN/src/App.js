import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

import axios from 'axios'

const ROOT_URL = 'http://localhost:5000';

const App = () => {
	const [categories, setCategories] = useState([])
	const [products, setProducts] = useState([])

	const [selectedCategory, setSelectedCategory] = useState([])

	const loadProducts = (category_id) => {

	}

	useEffect(() => {
		axios.get(ROOT_URL + '/api/category')
			.then(responce => responce.data)
			.then(category => {
				setCategories(category)
			})

		axios.get(ROOT_URL + '/api/products')
			.then(responce => responce.data)
			.then(products => {
				setProducts(products)
			})
	}, [])

	const categoryClick = (category) => {
		setSelectedCategory(category.id)
	}

	const addToCart = (product) => {
		alert(product.id)
	}

	const visableProduct = useMemo(() => {
		if (!selectedCategory) return products

		return products.filter((p) => p.category_id == selectedCategory)
	}, [products, selectedCategory])

const windowWidth = Dimensions.get('window').width;

	return (
		<View>
        	<View style={{  flexDirection: 'row', height: 50, aligItems: 'center', justifyContent: 'space-between' }}>
        		{categories.map((category) => {
        			const active = category.id === selectedCategory
        			return (
        				<TouchableOpacity  onPress={() => categoryClick(category)} style={{  justifyContent: 'center'}}>
        					<Text style={{ backgroundColor: active? 'red': '#fff'}}>{category.name}</Text>
        				</TouchableOpacity>
        			)
        		})}
        	</View>
        	<ScrollView>
        	<View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
        		{visableProduct.map((product) => {
        			return (
        				<View key={product.id} style={{ borderWidth: 2,
    borderColor: "#20232a", width: '50%', height: 220, position: 'relative' }}>
        					<Text style={{ position: 'absolute', color: '#fff', fontSize: 20, fontWeight: 'bold', bottom: 20, zIndex: 2, left: 20 }}>{product.name}</Text>
        					<Image style={{ width: windowWidth / 2, height: 200}} source={{
          uri: ROOT_URL + '/' + product.image,
        }}/>
        				<TouchableOpacity onPress={() => addToCart(product)}>
        					<Text>Закакзать</Text>
        				</TouchableOpacity>
        				</View>
        			)
        		})}
        	</View>
        	</ScrollView>
     	</View>
	)
}

export default App