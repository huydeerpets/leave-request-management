import React, { Component } from 'react';
import { Button } from 'antd'
export default class NotFound extends Component {
	render() {
		return (
			<div>
				<h1> Page Not Found.. :(</h1>
				<Button onClick={
					()=>{
						this.props.history.push('/')
					}
				} type='primary'> Home </Button>
			</div>
		)
	}
};
