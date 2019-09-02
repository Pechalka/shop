import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {  Link } from "react-router-dom";
import Editor from 'react-medium-editor';

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

class ContentEdit extends React.Component{
	state = {
		content: null,
		text: 'loading...'
	}

	componentDidMount() {
	 	axios.get(`http://localhost:5000/api/contents/${this.props.match.params.id}`)
			.then(responce => responce.data)
			.then(content => {
				this.setState({ content, text: content.value })
			})
	}
	save = () => {
		const { text } = this.state;

		axios.put(`http://localhost:5000/api/contents/${this.props.match.params.id}`, { value: text })
			.then(responce => responce.data)
			.then(content => {
				this.props.history.push('/contents');
			})
	}
	handleChange = (text, medium) => {
    	this.setState({ text: text });
  	}
	render() {
		const { content, text } = this.state;

		if (!content) return <div>loading...</div>

		const { key, value } = content;

		return (
			<div>
				<p>{key}</p>
				<div>
					<button onClick={this.save} className="button">Сохранить</button>
				</div>
				<div className="content ">
				<Editor
		          tag="pre"
		          text={text}
		          onChange={this.handleChange}
		          options={{ toolbar: { buttons: ['h2', 'h3', 'list', 'bold', 'italic', 'underline'] } }}
		        />
		        </div>
			</div>
		);
	}
}


export default ContentEdit;
